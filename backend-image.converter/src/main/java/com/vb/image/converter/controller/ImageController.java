package com.vb.image.converter.controller;

import com.vb.image.converter.entity.User;
import com.vb.image.converter.security.JwtUtility;
import com.vb.image.converter.service.ImageService;
import com.vb.image.converter.service.OauthAuthenticationPrincipleService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Set;

import com.vb.image.converter.repository.userRepo;
@RestController
@RequestMapping("/image")
public class ImageController {
    private final ImageService imageService;
    @Autowired
    private OauthAuthenticationPrincipleService principleService;

    @Autowired
    userRepo userRepo;
    @Autowired
    JwtUtility jwtUtility;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("dummy")
    public String dummy() {
        return "this is unlock you are authenticated person";
    }

    @GetMapping("/login")
    public RedirectView immageLogin() {
        return new RedirectView("http://localhost:5173/login");
    }

    @GetMapping("/validate/user")
    public ResponseEntity<?> validateUser(HttpServletResponse response) {
        System.out.println(principleService.getPrincipal());
        if (principleService.getPrincipal() == null)
            return ResponseEntity.badRequest().body("your unauthorise person");
        Map<String,Object> map = principleService.getPrincipal().getAttributes();
        if (userRepo.existsByusername((String)map.get("name"))){
            String token = jwtUtility.generateToken((String)map.get("name"));
             return ResponseEntity.ok(token);
        }else{
            String username = (String)map.get("name");
            String pwd = map.get("email").toString();
            Set<String> authority = Set.of("user");
            User user = new User(username,pwd,authority);
            System.out.println("user data print from google oauth : " + user);
            userRepo.save(user);
            String token = jwtUtility.generateToken((String)map.get("login"));
            return ResponseEntity.ok(token);
        }
    }


    @PostMapping("/getfile")
    public byte[] getFile(@RequestParam("changeformat") String changeFormat,
                          @RequestParam("file") MultipartFile file
            , HttpServletRequest req) throws IOException {
        System.out.println("file name is :" + file.getOriginalFilename());
        System.out.println("new format of file is  :" + changeFormat);
        System.out.println("size of given file is : " + file.getSize());
        System.out.println("the token extract from incoming requeset is  : " + req.getHeader("Authorization"));
        byte[] image = imageService.convertImageFormat(file, changeFormat);
        System.out.println(image);
        return image;
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convertImage(@RequestParam("file") MultipartFile file,
                                               @RequestParam("changeformat") String format) {
        try {
            System.out.println("The multipart file is: " + file.getOriginalFilename());
            System.out.println("The file format is: " + format);
            byte[] image = imageService.convertImageFormat(file, format);

            // Specify the directory and file name
            String directoryPath = "C:/Users/venka/OneDrive/Pictures/";
            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs(); // Create the directory if it doesn't exist
            }

            File outputFile = new File(directory, "newfile." + format);
            try (FileOutputStream fos = new FileOutputStream(outputFile)) {
                System.out.println("The size of the image is: " + image.length);
                fos.write(image);
                fos.flush();
            }

            return ResponseEntity.ok("You can check your new location: " + outputFile.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving the image: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}