import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { 
      fullName, 
      email, 
      password, 
      phone, 
      city, 
      postcode, 
      caaFlyerId, 
      caaOperatorId, 
      dbsConsent 
    } = await req.json();

    if (!email || !password || !fullName || !caaFlyerId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!dbsConsent) {
      return NextResponse.json(
        { message: "DBS consent is required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "PILOT",
        status: "PENDING_APPROVAL",
        pilotProfile: {
          create: {
            fullName,
            phone,
            city,
            postcode,
            caaFlyerId,
            caaOperatorId,
            dbsChecked: false, // Will be updated by admin after check
          },
        },
      },
    });

    // TODO: Send admin notification email

    return NextResponse.json(
      { message: "Pilot application submitted successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
