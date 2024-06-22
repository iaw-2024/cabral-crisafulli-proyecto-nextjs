import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { catchUpProduct, insertProduct, productWhithName } from "@/app/lib/data";
import { Categoria } from "@/app/lib/definitions";

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    secure_url: string;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();

        const image = data.get("file");

        if (data.get("action") === 'CREATE') {

            if (!image || !(image instanceof Blob)) {
                return NextResponse.json(
                    { message: "No se ha subido ninguna imagen", status: 400 },
                    { status: 400 }
                );
            }
            const productDB = await productWhithName(data.get("name")!.toString())

            if (productDB) {
                return NextResponse.json(
                    { message: "Existe un producto con ese nombre", status: 409 },
                    { status: 409 }
                );
            }

            const byte = await image.arrayBuffer();
            const buffer = Buffer.from(byte);

            const uploadResult: CloudinaryUploadResult = await new Promise(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error || !result) {
                                reject(error || new Error("Upload failed"));
                            } else {
                                resolve(result as CloudinaryUploadResult);
                            }
                        }
                    );
                    uploadStream.end(buffer);
                }
            );

            // Obtener otros datos del formulario
            const name = data.get("name")?.toString();
            const amount = data.get("amount")?.toString();
            const categoryId = data.get("categoryId")?.toString();
            const description = data.get("description")?.toString();
            const imageUrl = uploadResult.secure_url;

            // Validación simple de datos
            if (!name || !amount || !categoryId || !description) {
                return NextResponse.json(
                    { success: false, error: "Todos los campos son obligatorios" },
                    { status: 400 }
                );
            }

            // Validar y convertir el categoryId a un valor del tipo Categoria
            const validCategories: Categoria[] = ["Amistad", "Pareja", "Familia", "Individual", "Personalizada"];
            if (!validCategories.includes(categoryId as Categoria)) {
                return NextResponse.json(
                    { success: false, error: "Categoría no válida" },
                    { status: 400 }
                );
            }

            // Guardar los datos en la base de datos usando la función insertProduct
            const newProduct = await insertProduct(
                name,
                parseFloat(amount),
                description,
                categoryId as Categoria,
                imageUrl
            );

            return NextResponse.json(
                { success: true, product: newProduct },
                { status: 200 }
            );
        }
        else {
            if (data.get('action') === 'EDIT') {

                const productDB = await productWhithName(data.get("name")!.toString())
                if (productDB) {
                    if (productDB.id != Number(data.get("id"))) {
                        return NextResponse.json(
                            { message: "Existe un producto con ese nombre", status: 409 },
                            { status: 409 }
                        );
                    }
                }
                if (image && (image instanceof Blob)) {
                    const byte = await image.arrayBuffer();
                    const buffer = Buffer.from(byte);

                    const uploadResult: CloudinaryUploadResult = await new Promise(
                        (resolve, reject) => {
                            const uploadStream = cloudinary.uploader.upload_stream(
                                { resource_type: "image" },
                                (error, result) => {
                                    if (error || !result) {
                                        reject(error || new Error("Upload failed"));
                                    } else {
                                        resolve(result as CloudinaryUploadResult);
                                    }
                                }
                            );
                            uploadStream.end(buffer);
                        }
                    );
                    const imageUrl = uploadResult.secure_url;
                }
                else {
                    const id = Number(data.get("id"))
                    const name = data.get("name")?.toString();
                    const amount = Number(data.get("amount"));
                    const categoryId = data.get("categoryId")?.toString();
                    const description = data.get("description")?.toString();
                    const imageUrl = data.get('imageURL')?.toString()

                    const updateProduct = catchUpProduct(id, name!, amount, description!, categoryId as Categoria, imageUrl!)
                    return NextResponse.json(
                        { success: true, product: updateProduct },
                        { status: 200 }
                    );
                }
            }
        }

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
