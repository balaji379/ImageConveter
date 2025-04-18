package com.vb.image.converter.service;

import javax.imageio.*;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageOutputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Iterator;

@Service
public class ImageService {

    public byte[] convertImageFormat(MultipartFile file, String targetFormat) throws IOException {
        // Read the image from the uploaded file
        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());

        // Create a ByteArrayOutputStream to hold the converted image
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Get the ImageWriter for the target format
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(targetFormat);
        if (!writers.hasNext()) {
            throw new IllegalArgumentException("No writer found for format: " + targetFormat);
        }
        ImageWriter writer = writers.next();

        // Create an ImageOutputStream to write the converted image
        try (ImageOutputStream ios = ImageIO.createImageOutputStream(outputStream)) {
            writer.setOutput(ios);

            // Handle JPEG format specifically
            if ("jpeg".equalsIgnoreCase(targetFormat) || "jpg".equalsIgnoreCase(targetFormat)) {
                // Create a new BufferedImage without alpha channel
                BufferedImage jpegImage = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight(), BufferedImage.TYPE_INT_RGB);
                jpegImage.getGraphics().drawImage(bufferedImage, 0, 0, null);

                // Set JPEG compression quality
                JPEGImageWriteParam jpegParams = (JPEGImageWriteParam) writer.getDefaultWriteParam();
                jpegParams.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                jpegParams.setCompressionQuality(1.0f); // 1.0f is maximum quality

                writer.write(null, new IIOImage(jpegImage, null, null), jpegParams);
            } else if ("bmp".equalsIgnoreCase(targetFormat)) {
                // Convert to 24-bit RGB for BMP
                BufferedImage bmpImage = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight(), BufferedImage.TYPE_INT_RGB);
                bmpImage.getGraphics().drawImage(bufferedImage, 0, 0, null);
                writer.write(bmpImage);
            } else if ("wbmp".equalsIgnoreCase(targetFormat)) {
                // Convert to a binary (1-bit) image for WBMP
                BufferedImage wbmpImage = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight(), BufferedImage.TYPE_BYTE_BINARY);
                wbmpImage.getGraphics().drawImage(bufferedImage, 0, 0, null);
                writer.write(wbmpImage);
            } else if (file.getOriginalFilename().endsWith("wbmp") && ("png".equalsIgnoreCase(targetFormat) || "gif".equalsIgnoreCase(targetFormat))) {
                // Create a new BufferedImage with a suitable color model
                BufferedImage colorImage = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight(), BufferedImage.TYPE_INT_ARGB);
                colorImage.getGraphics().drawImage(bufferedImage, 0, 0, null);
                writer.write(colorImage);
            } else {
                // For other formats (PNG, GIF), write directly
                writer.write(bufferedImage);
            }
        } finally {
            writer.dispose();
        }

        return outputStream.toByteArray();
    }
}