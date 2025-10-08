import { connectToDatabase } from '@/config/DbConnect';
import House from '@/models/House';
import { NextResponse } from 'next/server';

// MongoDB connection helper


export async function GET() {
  try {
    await connectToDatabase();
    const houses = await House.find() // only return name and _id
    return NextResponse.json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch houses' },
      { status: 500 }
    );
  }
}

// POST: Create a new house
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    
    const {
      name,
      description,
      location,
      amenities,
      smartLockSupport,
      lockStatus
    } = body;

    // Basic validation
    if (!name || !location?.address || !location?.city || !location?.region) {
      return NextResponse.json(
        { error: 'Name, address, city, and region are required' },
        { status: 400 }
      );
    }

    // ✅ If smart lock is enabled, include lockStatus
    const newHouse = new House({
      name,
      description,
      location,
      amenities,
      smartLockSupport,
      lockStatus: smartLockSupport ? lockStatus : undefined,
    });

    await newHouse.save();

    return NextResponse.json(
      { message: 'House created successfully', house: newHouse },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating house:', error);
    return NextResponse.json(
      { error: 'Failed to create house' },
      { status: 500 }
    );
  }
}
