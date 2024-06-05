import {
  decimalRegex,
  emailRegex,
  nameRegex,
  noSpecialCharacterRegex,
  passwordRegex,
  phoneNumberRegex,
  urlRegex,
  usernameRegex,
} from "../../utils/regex";

// Define number
export const CREATE_NAME = 25;
export const DESCRIPTION = 256;
export const ROYALTIES_MIN = 1;
export const ROYALTIES_MAX = 50;
export const QUANTITY = 3;
export const PRICE = 18;

// Profile Page
export const formRulesProfile = {
  username: {
    required: "Please input username",
    pattern: { value: usernameRegex, message: "Invalid username" },
  },
  shortLink: {
    pattern: { value: nameRegex, message: "Invalid short link" },
  },
};

// Account Page
export const formRulesAccount = {
  username: {
    required: "Please input username",
    pattern: { value: usernameRegex, message: "Invalid username" },
  },
  password: {
    required: "Please input password",
    pattern: { value: passwordRegex, message: "Invalid password" },
  },
  fullName: {
    required: "Please input full name",
    pattern: { value: nameRegex, message: "Invalid name" },
  },
  email: {
    required: "Please input your email",
    pattern: { value: emailRegex, message: "Invalid email address" },
  },
  socialLink: {
    pattern: { value: urlRegex, message: "Invalid URL link" },
  },
  phone: {
    pattern: { value: phoneNumberRegex, message: "Invalid phone number" },
  },
};

export const formRulesResetPassword = {
  newPassword: {
    required: "Please input password",
    pattern: {
      value: passwordRegex,
      message:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
  currentPassword: {
    required: "Please input current password",
    pattern: {
      value: passwordRegex,
      message:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
  confirmPassword: {
    required: "Please input confirm password",
    pattern: { value: passwordRegex, message: "Passwords do not match" },
  },
};

// Create NFT
export const formRulesUploadFile = {
  avatar: {
    validate: {
      required: (v: Blob[]) =>
        (v && v.length > 0) || "Account image is required",
      audio: (values: Blob[]) => {
        if (values && values.length > 0) {
          const firstFileType = values[0].type.split("/")[0];
          if (firstFileType && firstFileType !== "audio") return true;
          return !!values[1] || "Cover photo is required";
        }
        return "Cover photo is required";
      },
    },
  },
};

// Profile setting
export const formRulesProfileSetting = {
  username: {
    required: "Please input username",
    minLength: {
      value: 6,
      message: "Username must have at least 6 characters",
    },
    maxLength: { value: 25, message: "Username cannot exceed 25 characters" },
  },
};

// Signup modal
export const formRulesSigupModal = {
  username: {
    required: "Please input username",
    minLength: {
      value: 6,
      message: "Username must have at least 6 characters",
    },
    maxLength: { value: 25, message: "Username cannot exceed 25 characters" },
  },
  email: {
    required: "Please input your email",
    pattern: { value: emailRegex, message: "Invalid email address" },
  },
};

// Create NFT
export const formRulesCreateNFT = {
  media: {
    validate: {
      required: (v: Blob[]) => (v && v.length > 0) || "NFT image is required",
      audio: (values: Blob[]) => {
        if (values && values.length > 0) {
          const firstFileType = values[0].type.split("/")[0];
          if (firstFileType && firstFileType !== "audio") return true;
          return !!values[1] || "Cover photo is required";
        }
        return "Cover photo is required";
      },
    },
  },
  name: {
    required: "Display name is required",
    maxLength: {
      value: CREATE_NAME,
      message: "Display name cannot exceed 25 characters",
    },
  },
  collection: {
    required: "Please choose a collection",
  },
  description: {
    maxLength: {
      value: DESCRIPTION,
      message: "Description cannot exceed 256 characters",
    },
  },
  royalties: {
    pattern: {
      value: decimalRegex,
      message: "Royalties are in the wrong format",
    },
    required: "Royalties is required",
    min: {
      value: ROYALTIES_MIN,
      message: "Royalties should be within range of 1% - 50%",
    },
    max: {
      value: ROYALTIES_MAX,
      message: "Royalties should be within range of 1% - 50%",
    },
  },
};

// Create Collection
export const formRulesCreateCollection = {
  name: {
    required: "Collection name is required!",
    pattern: {
      value: noSpecialCharacterRegex,
      message: "Collection name should not contain special characters",
    },
    maxLength: {
      value: CREATE_NAME,
      message: "Collection name cannot exceed 25 characters",
    },
  },
  symbol: {
    required: "Symbol is required!",
    pattern: {
      value: noSpecialCharacterRegex,
      message: "Collection symbol should not contain special characters",
    },
  },
  shortUrl: {
    pattern: {
      value: noSpecialCharacterRegex,
      message: "Short url should not contain special characters",
    },
  },
  description: {
    maxLength: {
      value: DESCRIPTION,
      message: "Description cannot exceed 256 characters",
    },
  },
  image: {
    required: "Collection image is required!",
  },
};
