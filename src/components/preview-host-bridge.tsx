import { useEffect } from "react";
import { useNavigate } from "react-router";
import { installPreviewHostBridge } from "@/lib/preview-host-bridge";

export function PreviewHostBridge() {
  const navigate = useNavigate();

  useEffect(() => {
    return installPreviewHostBridge({
      navigate: (path) => {
        navigate(path);
      },
      getRoutePaths: () => ["/", "/login", "/studio", "/work/:projectId"],
    });
  }, [navigate]);

  return null;
}
