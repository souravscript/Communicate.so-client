import { NextResponse } from "next/server";
import { headers } from 'next/headers';

const API_BASE_URL = 'http://localhost:8082';

export async function GET() {
  // Define mock data for development
  const mockMembers = [
    { 
      id: '1', 
      name: 'John Doe', 
      category: 'Employee',
      createdAt: '2023-01-15T08:30:00Z',
      lastLogin: '2023-05-20T14:25:30Z'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      category: 'Manager',
      createdAt: '2023-02-10T10:15:00Z',
      lastLogin: '2023-05-19T09:45:12Z'
    },
    { 
      id: '3', 
      name: 'Bob Johnson', 
      category: 'Customer',
      createdAt: '2023-03-05T13:20:00Z',
      lastLogin: '2023-05-18T16:30:45Z'
    },
    { 
      id: '4', 
      name: 'Alice Brown', 
      category: 'Vendor',
      createdAt: '2023-04-20T09:10:00Z',
      lastLogin: '2023-05-15T11:05:22Z'
    }
  ];

  try {
    const headersList = headers();
    const cookie = headersList.get('cookie');

    console.log('Fetching members with cookie:', cookie);

    // For development: If no cookie, return mock data
    if (!cookie) {
      console.log('No authentication token found, returning mock data for development');
      return NextResponse.json(mockMembers);
    }

    // Attempt to fetch data from backend
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/v1/members`, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie || '',
        },
        //credentials: 'include',
      });
    } catch (error) {
      // Handle connection errors (e.g., server not running)
      console.error('Connection error to backend:', error);
      console.log('Returning mock data due to connection error');
      return NextResponse.json(mockMembers);
    }

    // Handle response status
    if (!response.ok) {
      // For unauthorized, return mock data for development
      if (response.status === 401) {
        console.log('Authentication failed, returning mock data for development');
        return NextResponse.json(mockMembers);
      }
      
      // For other error statuses, try to get error message
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignore JSON parsing errors
      }
      
      return NextResponse.json(
        { message: errorMessage },
        { status: response.status }
      );
    }

    // Parse and return successful response
    try {
      const data = await response.json();
      console.log('Successfully fetched members:', data);
      return NextResponse.json(data);
    } catch (error) {
      // If we can't parse the response
      console.error('Error parsing response:', error);
      console.log('Returning mock data due to parsing error');
      return NextResponse.json(mockMembers);
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error fetching members:', error);
    console.log('Returning mock data due to unexpected error');
    return NextResponse.json(mockMembers);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const cookie = headersList.get('cookie');

    // Validate input
    if (!body.name || !body.category) {
      return NextResponse.json(
        { message: "Name and category are required" },
        { status: 400 }
      );
    }

    // For development: If no cookie, create mock member
    if (!cookie) {
      console.log('No authentication token found, creating mock member');
      return NextResponse.json(
        { 
          id: Date.now().toString(), 
          name: body.name, 
          category: body.category,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }, 
        { status: 201 }
      );
    }

    // Attempt to create member on backend
    let response;
    
    try {
      response = await fetch(`${API_BASE_URL}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie || '',
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error('Connection error to backend:', error);
      // For development: Return mock created member
      return NextResponse.json(
        { 
          id: Date.now().toString(), 
          name: body.name, 
          category: body.category,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }, 
        { status: 201 }
      );
    }

    // Handle non-OK responses
    if (!response.ok) {
      // For unauthorized, create mock member for development
      if (response.status === 401) {
        console.log('Authentication failed, creating mock member');
        return NextResponse.json(
          { 
            id: Date.now().toString(), 
            name: body.name, 
            category: body.category,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          }, 
          { status: 201 }
        );
      }
      
      let errorMessage = `Error: ${response.status}`;
      
      // Try to extract error message from response if possible
      const errorText = await response.text();
      if (errorText) {
        try {
          const errorData = JSON.parse(errorText);
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // If JSON parsing fails, use the response text if it's not too long
          if (errorText.length < 100) {
            errorMessage = errorText;
          }
        }
      }
      
      return NextResponse.json(
        { message: errorMessage },
        { status: response.status }
      );
    }

    // Parse successful response
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
    
  } catch (error) {
    // This catches JSON parsing errors from request.json() and response.json()
    // as well as any other unexpected errors
    console.error('Error in POST /api/member:', error);
    
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    const headersList = headers();
    const cookie = headersList.get('cookie');

    // Validate request parameters
    if (!ids) {
      return NextResponse.json(
        { message: "Member IDs are required" },
        { status: 400 }
      );
    }

    const memberIds = ids.split(',');
    
    // If no cookie, return authentication error
    if (!cookie) {
      console.log('No authentication token found');
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    
    // Attempt to delete members on backend
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/members`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie || '',
        },
        //credentials: 'include',
        body: JSON.stringify({ ids: memberIds }),
      });
    } catch (error) {
      // Handle connection errors (e.g., server not running)
      console.error('Connection error to backend:', error);
      return NextResponse.json(
        { message: "Failed to connect to backend server" },
        { status: 500 }
      );
    }

    // Handle response status
    if (!response.ok) {
      // For error statuses, try to get error message
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignore JSON parsing errors
      }
      
      return NextResponse.json(
        { message: errorMessage },
        { status: response.status }
      );
    }

    // Return successful response
    return NextResponse.json({ message: "Members deleted successfully" });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error deleting members:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to delete members" },
      { status: 500 }
    );
  }
}
