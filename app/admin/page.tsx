/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AX4IGQDsiFn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Component() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-1 grid grid-cols-1 gap-8 lg:col-span-2">
        <Card className="grid grid-cols-2 gap-6">
          <div className="col-span-1 grid gap-2">
            <CardTitle>Total Books</CardTitle>
            <div className="text-4xl font-bold">1,234</div>
          </div>
          <div className="col-span-1 grid gap-2">
            <CardTitle>Total Users</CardTitle>
            <div className="text-4xl font-bold">4,567</div>
          </div>
          <div className="col-span-1 grid gap-2">
            <CardTitle>Active Loans</CardTitle>
            <div className="text-4xl font-bold">789</div>
          </div>
          <div className="col-span-1 grid gap-2">
            <CardTitle>Pending Requests</CardTitle>
            <div className="text-4xl font-bold">321</div>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Books</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>The Great Gatsby</TableCell>
                  <TableCell>F. Scott Fitzgerald</TableCell>
                  <TableCell>2023-04-15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>To Kill a Mockingbird</TableCell>
                  <TableCell>Harper Lee</TableCell>
                  <TableCell>2023-04-12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1984</TableCell>
                  <TableCell>George Orwell</TableCell>
                  <TableCell>2023-04-10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pride and Prejudice</TableCell>
                  <TableCell>Jane Austen</TableCell>
                  <TableCell>2023-04-08</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Borrowers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Loans</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Lee</TableCell>
                  <TableCell>7</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Books</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Bookmarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>To Kill a Mockingbird</TableCell>
                  <TableCell>1,234</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>The Great Gatsby</TableCell>
                  <TableCell>987</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1984</TableCell>
                  <TableCell>876</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pride and Prejudice</TableCell>
                  <TableCell>765</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
