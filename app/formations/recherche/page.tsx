import { Suspense } from "react";
import SearchResultsContent from "./SearchResultsContent";

export default function Page() {
  return (
    <Suspense>
      <SearchResultsContent />
    </Suspense>
  );
}
