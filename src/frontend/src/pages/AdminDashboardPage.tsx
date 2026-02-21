import { useState, useMemo } from 'react';
import { useContactSubmissions } from '@/hooks/useQueries';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown, Loader2, AlertCircle } from 'lucide-react';
import type { ContactSubmission } from '../backend';

type SortField = 'customerName' | 'customerEmail' | 'address' | 'submittedAt';
type SortDirection = 'asc' | 'desc';

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useContactSubmissions();
  const [sortField, setSortField] = useState<SortField>('submittedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSubmissions = useMemo(() => {
    if (!data?.submissions) return [];

    const sorted = [...data.submissions].sort((a, b) => {
      let aValue: string | bigint = a[sortField];
      let bValue: string | bigint = b[sortField];

      if (sortField === 'submittedAt') {
        const aTime = Number(aValue);
        const bTime = Number(bValue);
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }

      // String comparison for other fields
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return sorted;
  }, [data?.submissions, sortField, sortDirection]);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert from nanoseconds
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="font-script text-5xl text-burgundy mb-2">Admin Dashboard</h1>
              <p className="text-brown/80 text-lg">Customer Inquiries & Contact Submissions</p>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-burgundy" />
                <span className="ml-3 text-brown">Loading submissions...</span>
              </div>
            )}

            {isError && (
              <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-8 flex items-start space-x-4">
                <AlertCircle className="text-destructive flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-destructive font-semibold text-lg mb-1">Error Loading Data</h3>
                  <p className="text-destructive/80">
                    Failed to load contact submissions. Please try refreshing the page.
                  </p>
                </div>
              </div>
            )}

            {!isLoading && !isError && data && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 bg-kraft border-b border-brown/10">
                  <h2 className="font-script text-2xl text-burgundy">
                    Total Submissions: {sortedSubmissions.length}
                  </h2>
                </div>

                {sortedSubmissions.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-brown/60 text-lg">No contact submissions yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-kraft/50 hover:bg-kraft/70">
                          <TableHead className="font-semibold">
                            <Button
                              variant="ghost"
                              onClick={() => handleSort('customerName')}
                              className="hover:bg-burgundy/10 font-semibold text-brown"
                            >
                              Name
                              <SortIcon field="customerName" />
                            </Button>
                          </TableHead>
                          <TableHead className="font-semibold">
                            <Button
                              variant="ghost"
                              onClick={() => handleSort('customerEmail')}
                              className="hover:bg-burgundy/10 font-semibold text-brown"
                            >
                              Email
                              <SortIcon field="customerEmail" />
                            </Button>
                          </TableHead>
                          <TableHead className="font-semibold">
                            <Button
                              variant="ghost"
                              onClick={() => handleSort('address')}
                              className="hover:bg-burgundy/10 font-semibold text-brown"
                            >
                              Address
                              <SortIcon field="address" />
                            </Button>
                          </TableHead>
                          <TableHead className="font-semibold">Message</TableHead>
                          <TableHead className="font-semibold">
                            <Button
                              variant="ghost"
                              onClick={() => handleSort('submittedAt')}
                              className="hover:bg-burgundy/10 font-semibold text-brown"
                            >
                              Date
                              <SortIcon field="submittedAt" />
                            </Button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedSubmissions.map((submission) => (
                          <TableRow
                            key={submission.id}
                            className="hover:bg-kraft/20 transition-colors"
                          >
                            <TableCell className="font-medium text-brown">
                              {submission.customerName}
                            </TableCell>
                            <TableCell className="text-forest">
                              <a
                                href={`mailto:${submission.customerEmail}`}
                                className="hover:underline"
                              >
                                {submission.customerEmail}
                              </a>
                            </TableCell>
                            <TableCell className="text-brown/80 max-w-xs truncate">
                              {submission.address}
                            </TableCell>
                            <TableCell className="text-brown/80 max-w-md">
                              {submission.message ? (
                                <div className="truncate" title={submission.message}>
                                  {submission.message}
                                </div>
                              ) : (
                                <span className="text-brown/40 italic">No message</span>
                              )}
                            </TableCell>
                            <TableCell className="text-brown/60 whitespace-nowrap">
                              {formatDate(submission.submittedAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
