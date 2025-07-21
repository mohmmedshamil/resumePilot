import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
// Create a loader element
// Create a loader element
function createLoader() {
    if (typeof window === "undefined") {
        return {
            element: null,
            remove: () => {},
            update: () => {},
        };
    }
    const loaderOverlay = document.createElement("div");
    loaderOverlay.style.position = "fixed";
    loaderOverlay.style.top = "0";
    loaderOverlay.style.left = "0";
    loaderOverlay.style.width = "100vw";
    loaderOverlay.style.height = "100vh";
    loaderOverlay.style.display = "flex";
    loaderOverlay.style.justifyContent = "center";
    loaderOverlay.style.alignItems = "center";
    loaderOverlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    loaderOverlay.style.zIndex = "9999";

    const spinner = document.createElement("div");
    spinner.style.width = "50px";
    spinner.style.height = "50px";
    spinner.style.border = "6px solid #ccc";
    spinner.style.borderTop = "6px solid #008080";
    spinner.style.borderRadius = "50%";
    spinner.style.animation = "spin 1s linear infinite";

    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleTag);

    loaderOverlay.appendChild(spinner);
    document.body.appendChild(loaderOverlay);

    return {
        element: loaderOverlay,
        remove: () => {
            if (loaderOverlay.parentNode) {
                document.body.removeChild(loaderOverlay);
            }
            if (styleTag.parentNode) {
                document.head.removeChild(styleTag);
            }
        },
        update: (progress) => {
            // Optional: log progress or show it visually if needed later
            // For now, just define the method to avoid "not a function" error
            // console.log(`Progress: ${progress}%`);
        },
    };
}

// Axios request configuration with loader
async function apiRequest(endpoint, options = {}) {
    const loader = createLoader();
    const url = `${BASE_URL}${endpoint}`;
    const token =
        typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

    const headers = {
        Authorization: token ? `Bearer ${token}` : undefined,
        ...options.headers,
    };

    if (options.data instanceof FormData) {
        delete headers["Content-Type"];
    }

    try {
        // Start loader
        loader.update(30); // Initial progress

        const response = await axios({
            ...options,
            url,
            headers,
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted =
                        Math.round(
                            (progressEvent.loaded * 70) / progressEvent.total
                        ) + 30; // Goes from 30% to 100%
                    loader.update(percentCompleted);
                }
            },
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted =
                        Math.round(
                            (progressEvent.loaded * 70) / progressEvent.total
                        ) + 30; // Goes from 30% to 100%
                    loader.update(percentCompleted);
                }
            },
        });

        loader.update(100);
        setTimeout(() => loader.remove(), 300); // Smooth completion before removal
        return response;
    } catch (error) {
        loader.remove();
        console.error("Actual API error:", error); // <-- Add this line
        if (axios.isAxiosError(error)) {
            throw error;
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

// API routes
export const apiService = {
    registerUser: (name, email, password) =>
        apiRequest("/user/signup", {
            method: "POST",
            data: { name, email, password },
        }),

    loginUser: (email, password) =>
        apiRequest("/user/login", {
            method: "POST",
            data: { email, password },
        }),

    fetchUser: (userId) =>
        apiRequest(`/user/profile/${userId}`, {
            method: "GET",
        }),

    fetchProfile: () =>
        apiRequest(`/user/me`, {
            method: "GET",
        }),

    resendOtp: (email) =>
        apiRequest("/user/resend-otp", {
            method: "POST",
            data: { email },
        }),

    forgotPassword: (email) =>
        apiRequest("/user/forgot-password", {
            method: "POST",
            data: { email },
        }),

    resetPassword: (email, otp, newPassword) =>
        apiRequest("/user/reset-password", {
            method: "POST",
            data: { email, otp, newPassword },
        }),

    verifyOtp: (userId, otp) =>
        apiRequest("/user/verify-otp", {
            method: "POST",
            data: { userId, otp },
        }),
    uploadResume: (formData) =>
        apiRequest("/landingPage/upload", {
            method: "POST",
            data: formData,
        }),
    getResumeDetails: () =>
        apiRequest("/landingPage/latest", {
            method: "GET",
        }),
    deployPortfolio: (userData) => 
      apiRequest("/landingPage/deploy", {
        method: "POST",
        data: userData
      })
};
