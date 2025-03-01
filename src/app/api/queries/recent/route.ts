import { NextResponse } from "next/server";
import { Query } from "@/redux/slices/querySlice";

// Mock data for recent queries
const recentQueries: Query[] = [
  {
    id: "1",
    text: "How to implement Redux in Next.js?",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    userId: "user1",
    category: "Development"
  },
  {
    id: "2",
    text: "Best practices for TypeScript with React",
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    userId: "user2",
    category: "Development"
  },
  {
    id: "3",
    text: "How to handle async actions in Redux?",
    timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    userId: "user1",
    category: "Development"
  },
];

export async function GET() {
  try {
    // Sort queries by timestamp, most recent first
    const sortedQueries = [...recentQueries].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json(sortedQueries);
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error fetching recent queries:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch recent queries" },
      { status: 500 }
    );
  }
}
