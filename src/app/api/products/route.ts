import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { productSchema } from "@/validations/product.validation";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validatedData = productSchema.parse(body);

    const product = await Product.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     await connectDB();

//     const products = await Product.find().sort({ createdAt: -1 });

//     return NextResponse.json({
//       success: true,
//       products,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Server Error",
//       },
//       { status: 500 }
//     );
//   }
// }


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const sort = searchParams.get("sort") || "-createdAt";
const query: Record<string, object | string> = {};
    // const query: any = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    query.price = {
      $gte: minPrice,
      $lte: maxPrice,
    };

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}