import { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { create } from "zustand";
import axios from "axios";
async function changeToNewFormat(file, changeFormat, jwt, naivgate) {
  const data = new FormData();
  data.append("changeformat", changeFormat);
  data.append("file", file);
  try {
    const response = await axios.post(
      "http://localhost:8080/image/getfile",
      data,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      }
    );
    console.log(
      `reponse status for conversion result is ${response.status} ${response.statusText}`
    );

    if (response.status >= 400 === false) {
      const blob = new Blob([response.data], {
        type: `image/${changeFormat}`, // Ensure item.changeFormat is valid
      });
      const url = URL.createObjectURL(blob);
      console.log(url);
      return url;
    } else {
      throw new Error("Header field is missing");
    }
  } catch (e) {
    naivgate("/authentication_error");
    throw new Error("Header field is missing");
  }
}
const ImageConverterStore = create((set, get) => ({
  files: [],
  flag: false,
  newFormatFile: [],
  imageUrl: "none",
  emailPlaceHolder: "Enter Email",
  passPlaceHolder: "Enter Password",
  emailclassName: "form-control  border  ps-0 border-start-0  rounded-end-5",
  passclassName:
    "form-control  border border ps-0 border-start-0  rounded-end-5",
  emailIconclassName: "input-group-text pe-2 border border  rounded-start-5",
  passIconclassName: "input-group-text pe-2 border border  rounded-start-5",
  islogged: "false",
  jwtToken: "",
  tokenvalidation: "false",

  setTokenValidation: () => {
    set((state) => {
      return {
        tokenvalidation: "true",
      };
    });
  },
  setImageurl: (imgurl) => {
    set((state) => {
      return {
        imageUrl: imgurl,
      };
    });
  },

  setjwt: (token) => {
    console.log("this is jwt " + token);
    set((state) => {
      return {
        jwtToken: token,
      };
    });
  },

  changeErrorMeassage: (name) => {
    console.log("this is print from changeErrorMeassage");

    if (name === "email") {
      set((state) => {
        return {
          emailclassName:
            "form-control  border  ps-0 border-start-0  rounded-end-5",
          emailIconclassName:
            "input-group-text pe-2 border border  rounded-start-5",
        };
      });
    } else {
      set((state) => {
        return {
          passclassName:
            "form-control  border  ps-0 border-start-0  rounded-end-5",
          passIconclassName:
            "input-group-text pe-2 border border  rounded-start-5",
        };
      });
    }
  },
  // this function is uesd to validate the user
  setislogged: (input) => {
    set((state) => {
      return {
        islogged: input,
      };
    });
  },
  handleLoginFormError: (error, name, setValue) => {
    const errorName = name === "email" ? "emailPlaceHolder" : "passPlaceHolder";
    console.log("name of error is " + errorName);
    console.log("error message is " + error.message);

    setValue(name, "");
    set((state) => {
      if (name === "email") {
        return {
          emailPlaceHolder: error.message,
          emailclassName:
            "form-control input-field  border   ps-0 border-start-0  rounded-end-5",
          emailIconclassName:
            "input-group-text input-field-icon pe-2 border boder-danger  rounded-start-5",
        };
      } else
        return {
          passPlaceHolder: error.message,
          inputFieldclass: "form-control input-field ps-0 rounded-end-5",
          passclassName:
            "form-control  border input-field  ps-0 border-start-0  rounded-end-5",
          passIconclassName:
            "input-group-text pe-2 input-field-icon border boder-danger  rounded-start-5",
        };
    });
  },

  setFlag: () => {
    set((state) => {
      return { flag: !state.flag };
    });
  },
  reSetIndex: () => {
    set((state) => ({
      files: state.files.map((file, index) => {
        file.file.id = index + 1;
        return file;
      }),
    }));
  },

  changeFormat: (fileId, newformat) => {
    set((state) => {
      // file upadation
      const updatedfiles = state.files.map((file) => {
        if (file.file.id === fileId) {
          return { ...file, changeFormat: newformat };
        } else return file;
      });
      // state updations
      return { files: updatedfiles };
    });
  },

  setFiles: (file) => {
    file.id = get().files.length + 1;
    const fileobj = {
      file: file,
      changeFormat: "jpg",
      downloadFlag: false,
      downloadImg: "none",
    };
    set((state) => ({
      files: [...state.files, fileobj],
    }));
  },

  removeFile: (fileid) => {
    set((state) => {
      const filteredFiles = state.files.filter(
        (file) => file.file.id !== fileid
      );
      // Update IDs after filtering
      const updatedFiles = filteredFiles.map((file, index) => {
        file.file.id = index + 1;
        return file;
      });
      return { files: updatedFiles };
    });
  },
  convertFormat: async (navigate) => {
    const oldfiles = get().files;

    // Use Promise.all to wait for all promises to resolve
    const newformatImgs = await Promise.all(
      oldfiles.map(async (item) => {
        const { jwtToken } = get();
        // Wait for the async function to resolve
        item.downloadImg = await changeToNewFormat(
          item.file,
          item.changeFormat,
          jwtToken,
          navigate
        );
        item.downloadFlag = true;
        return item;
      })
    );

    console.log(JSON.stringify(newformatImgs));

    // Update the state with the new array
    set((state) => {
      return { files: newformatImgs };
    });
  },
  loginRequest: async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  },
}));

export default ImageConverterStore;
