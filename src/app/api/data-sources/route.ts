import { NextResponse } from "next/server";
import { headers } from 'next/headers';

const API_BASE_URL = 'http://localhost:8082';

export async function GET() {
  try {
    const headersList = headers();
    const cookie = headersList.get('cookie');

    // If no cookie, return authentication error
    if (!cookie) {
      console.log('No authentication token found');
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Attempt to fetch data from backend
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/v1/data-sources`, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie || '',
        },
        credentials: 'include',
      });
    } catch (error) {
      // Handle connection errors (e.g., server not running)
      console.error('Connection error to backend:', error);
      return NextResponse.json(
        { message: 'Failed to connect to backend server' },
        { status: 503 }
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

    // Parse and return successful response
    try {
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      // If we can't parse the response, return an error
      console.error('Error parsing response:', error);
      return NextResponse.json(
        { message: 'Error processing server response' },
        { status: 500 }
      );
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error fetching data sources:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch data sources" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const headersList = headers();
    const cookie = headersList.get('cookie');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Get the request body
    const body = await request.json();
    const isEnabled = body.isEnabled;

    // Validate request parameters
    if (!id) {
      return NextResponse.json(
        { message: "Data source ID is required" },
        { status: 400 }
      );
    }

    if (typeof isEnabled !== 'boolean') {
      return NextResponse.json(
        { message: "isEnabled must be a boolean value" },
        { status: 400 }
      );
    }

    console.log(`${isEnabled ? 'Enabling' : 'Disabling'} data source with ID: ${id}`);

    // If no cookie, return authentication error
    if (!cookie) {
      console.log('No authentication token found');
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Attempt to update data source on backend
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/v1/data-sources/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie || '',
        },
        credentials: 'include',
        body: JSON.stringify({ isEnabled }), // Use the isEnabled value from request
      });
    } catch (error) {
      // Handle connection errors (e.g., server not running)
      console.error('Connection error to backend:', error);
      return NextResponse.json(
        { message: 'Failed to connect to backend server' },
        { status: 503 }
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

    // Parse and return successful response
    try {
      const data = await response.json();
      console.log('Successfully updated data source:', data);
      return NextResponse.json(data);
    } catch (error) {
      // If we can't parse the response, return an error
      console.error('Error parsing response:', error);
      return NextResponse.json(
        { message: 'Error processing server response' },
        { status: 500 }
      );
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error updating data source:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to update data source" },
      { status: 500 }
    );
  }
}