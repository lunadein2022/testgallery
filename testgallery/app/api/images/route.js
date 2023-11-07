import {PrismaClient} from "@prisma/client"
import {NextResponse} from "next/server"

const prisma = new PrismaClient()

export const GET = async () => {
  try {
    const image = await prisma.image.findMany()
    return new NextResponse (
      JSON.stringify(image),
      {status: 200},
      console.log({image})
    );
  } catch (err){
    console.log(err)
    return new NextResponse (
      JSON.stringify({message: "잘못됐어요!"}),
      {status: 500}
    );
  }
};

export const POST = async () => {
  return new NextResponse("Hello", {status: 200})
}