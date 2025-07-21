import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function DeployStatusModal({
  deployFunction,
}: {
  deployFunction: () => Promise<any>;
}) {
  const [status, setStatus] = useState("Fetching data...");
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const deploy = async () => {
      try {
        setStatus("Deploying...");
        const res = await deployFunction();

        if (res?.url) {
          setStatus("✅ Deployment Complete");
          setUrl(res.url);
        } else {
          throw new Error("Deployment succeeded, but URL not found.");
        }
      } catch (e: any) {
        console.error(e);
        setError(e?.message || "Something went wrong.");
        setStatus("❌ Deployment Failed");
      }
    };

    deploy();
  }, []);

  const isLoading = !url && !error;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1f1f1f] text-white rounded-2xl p-8 shadow-xl w-[90%] max-w-md"
      >
        <h2 className="text-2xl font-bold mb-3 text-white">Deploying Portfolio</h2>
        <p className="text-gray-300 mb-6">{status}</p>

        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-8 w-8 text-yellow-400" />
          </div>
        )}

        {url && (
          <div className="bg-[#2c2c2c] rounded-md p-4 mt-4">
            <p className="text-green-400 font-semibold mb-1">✅ Live at:</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 break-all underline hover:text-blue-300"
            >
              {url}
            </a>
          </div>
        )}

        {error && (
          <div className="text-red-400 mt-4">
            <p>{error}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
