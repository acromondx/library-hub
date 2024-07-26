import db from "@/db/db";
import {
  startOfDay,
  subDays,
  subMonths,
  subQuarters,
  subYears,
} from "date-fns";

type TimeRange = "lastWeek" | "lastMonth " | "lastQuarter" | "lastYear";

const getStartDate = (timeRange: TimeRange): Date => {
  const now = new Date();
  switch (timeRange) {
    case "lastWeek":
      return startOfDay(subDays(now, 7));
    case "lastMonth ":
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
    FROM Loan
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
    FROM Loan l
    JOIN Book b ON l.bookId = b.id
    JOIN Category c ON b.categoryId = c.id
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
