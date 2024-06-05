// Login
export const formRulesLogin = {
  username: {
    required: "Please input username",
    minLength: {
      value: 6,
      message: "Username must have at least 6 characters",
    },
    maxLength: { value: 25, message: "Username cannot exceed 25 characters" },
  },
  password: {
    required: "Please input your password",
    minLength: {
      value: 6,
      message: "Password must have at least 6 characters",
    },
  },
};

// Update Round
export const formRulesRound = {
  id: {},
  name: {
    required: "Please input round name",
  },
  type: {
    required: "Please input type round",
  },
  description: {
    required: "Please input description",
  },
};

// Create Round
export const formRulesCreateRound = {
  name: {
    required: "Please input round name",
  },
  type: {
    required: "Please input type round",
  },
  description: {
    required: "Please input description",
  },
};
