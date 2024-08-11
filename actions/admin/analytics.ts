import db from "@/db/db";
import { PrismaClient } from "@prisma/client";
import {
  startOfDay,
  subDays,
  subMonths,
  subQuarters,
  subYears,
} from "date-fns";

type TimeRange = "lastWeek" | "lastMonth" | "lastQuarter" | "lastYear";

const getStartDate = (timeRange: TimeRange): Date => {
  const now = new Date();
  switch (timeRange) {
    case "lastWeek":
      return startOfDay(subDays(now, 7));
    case "lastMonth":
      return startOfDay(subMonths(now, 1));
    case "lastQuarter":
      return startOfDay(subQuarters(now, 1));
    case "lastYear":
      return startOfDay(subYears(now, 1));
    default:
      return startOfDay(subMonths(now, 1));
  }
};

export async function getLoanTrends(timeRange: TimeRange) {
  const startDate = getStartDate(timeRange);

  const loanTrends = await db.$queryRaw`
    SELECT
      DATE(loanedAt) as date,
      COUNT(*) as loans,
      SUM(CASE WHEN returnedAt IS NOT NULL THEN 1 ELSE 0 END) as returns
    FROM "Loan"
    WHERE loanedAt >= ${startDate}
    GROUP BY DATE(loanedAt)
    ORDER BY DATE(loanedAt)
  `;

  return loanTrends;
}

export async function getCategoryDistribution(timeRange: TimeRange) {
  const startDate = getStartDate(timeRange);

  const categoryDistribution = await db.$queryRaw`
    SELECT
      c.name,
      COUNT(*) as value
    FROM "Loan" l
    JOIN "Book" b ON l.bookId = b.id
    JOIN "Category" c ON b.categoryId = c.id
    WHERE l.loanedAt >= ${startDate}
    GROUP BY c.name
    ORDER BY value DESC
  `;

  return categoryDistribution;
}

export async function getTopBorrowedBooks(timeRange: TimeRange) {
  const startDate = getStartDate(timeRange);

  const topBooks = await db.book.findMany({
    select: {
      title: true,
      _count: {
        select: { loans: true },
      },
    },
    where: {
      loans: {
        some: {
          loanedAt: {
            gte: startDate,
          },
        },
      },
    },
    orderBy: {
      loans: {
        _count: "desc",
      },
    },
    take: 5,
  });

  return topBooks.map((book) => ({
    title: book.title,
    loanCount: book._count.loans,
  }));
}

export async function getMostActiveUsers(timeRange: TimeRange) {
  const startDate = getStartDate(timeRange);

  const activeUsers = await db.user.findMany({
    select: {
      name: true,
      _count: {
        select: { loans: true },
      },
    },
    where: {
      loans: {
        some: {
          loanedAt: {
            gte: startDate,
          },
        },
      },
    },
    orderBy: {
      loans: {
        _count: "desc",
      },
    },
    take: 5,
  });

  return activeUsers.map((user) => ({
    username: user.name || "Anonymous",
    loanCount: user._count.loans,
  }));
}

export async function getAnalyticsData(timeRange: TimeRange) {
  const [loanTrends, categoryDistribution, topBooks, activeUsers] =
    await Promise.all([
      getLoanTrends(timeRange),
      getCategoryDistribution(timeRange),
      getTopBorrowedBooks(timeRange),
      getMostActiveUsers(timeRange),
    ]);

  return {
    loanTrends,
    categoryDistribution,
    topBooks,
    activeUsers,
  };
}

export async function fetchDashboardMetrics() {
  const totalUsers = await db.user.count();
  const totalBooks = await db.book.count();

  const activeLoans = await db.loan.count({
    where: {
      status: "ACTIVE",
    },
  });

  const pendingRequests = await db.request.count({
    where: {
      status: "PENDING",
    },
  });

  const recentLoans = await db.loan.findMany({
    orderBy: {
      loanedAt: "desc",
    },
    take: 3,
    include: {
      book: true,
      user: true,
    },
  });

  const recentRequests = await db.request.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
    include: {
      user: true,
    },
  });

  const loanStats = await db.$queryRaw<{ month: string; loans: number }[]>`
    SELECT
      DATE_FORMAT(MIN(loanedAt), '%b') as month,  -- Use MIN or MAX on loanedAt
      COUNT(*) as loans
    FROM
      Loan
    WHERE
      YEAR(loanedAt) = YEAR(CURDATE())
    GROUP BY
      MONTH(loanedAt)
    ORDER BY
      MONTH(loanedAt)
  `;

  return {
    totalUsers,
    totalBooks,
    activeLoans,
    pendingRequests,
    recentLoans: recentLoans.map((loan) => ({
      id: loan.id,
      book: loan.book.title,
      user: loan.user.name,
      dueDate: loan.dueDate.toISOString().split("T")[0],
    })),
    recentRequests: recentRequests.map((request) => ({
      id: request.id,
      type: request.type,
      user: request.user.name,
    })),
    loanStats: loanStats.map((stat) => ({
      name: stat.month,
      loans: Number(stat.loans),
    })),
  };
}
