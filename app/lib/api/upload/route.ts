import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Definición de la interfaz para la respuesta de Cloudinary
interface CloudinaryUploadResult {
    secure_url: string;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const image = data.get('file');

        if (!image || !(image instanceof Blob)) {
            return NextResponse.json({ message: 'No se ha subido ninguna imagen', status: 400 });
        }

        const byte = await image.arrayBuffer();
        const buffer = Buffer.from(byte);

        const uploadResult: CloudinaryUploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error || !result) {
                        reject(error || new Error('Upload failed'));
                    } else {
                        resolve(result as CloudinaryUploadResult);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({ success: true, url: uploadResult.secure_url }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
