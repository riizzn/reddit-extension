import { Save, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const CredentialForm = () => {
  const [showpass, setshowpass] = useState(false);

  return (
    <div className=" w-[450px] ">
      <div className=" bg-[#18181b] flex items-center  font-sans  p-1 ">
        <div className="w-full max-w-md space-y-6 m-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">API Configuration</h2>
            <p className="text-sm text-gray-400 mt-2 ">
              Enter your API credentials
            </p>
          </div>
          <div className="bg-[#332b37] shadow-md rounded-lg p-5">
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="endpoint"
                    className=" block text-sm font-medium text-white mb-1"
                  >
                    Endpoint
                  </label>
                  <input
                    id="endpoint"
                    name="endpoint"
                    required
                    type="url"
                    placeholder="https://api.example.com/v1"
                    className="w-full px-3 py-2 text-white text-sm rounded border border-[#3f3f46] outline-none focus:ring-2 focus:ring-purple-200 bg-[#18181b] "
                  />
                </div>
                <div>
                  <label
                    htmlFor="apiKey"
                    className="text-sm block font-medium text-white mb-1"
                  >
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      id="apiKey"
                      name="apiKey"
                      type={showpass ? "text" : "password"}
                      required
                      placeholder="Enter your API key"
                      className="w-full px-3 py-2 pr-10 text-white text-sm rounded border border-[#3f3f46] outline-none focus:ring-2 focus:ring-purple-200 bg-[#18181b] "
                    />
                    <button
                      type="button"
                      onClick={() => setshowpass((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                    >
                      {showpass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center  justify-center gap-2 px-4 py-2 bg-[#94819d] hover:bg-[#83639c] text-white font-semibold rounded-md transition-colors duration-200 "
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-center">
            Your API credentials are securely processed on browser storage
          </p>
        </div>
      </div>
    </div>
  );
};

export default CredentialForm;
