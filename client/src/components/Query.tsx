import { useRecoilValueLoadable } from "recoil";
import { inn } from "@/store/atom/inoutquery";
function Query() {
  const data = useRecoilValueLoadable(inn);
  if (data.state === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (data.state === "hasError") {
    return <div className="text-center">Error loading data</div>;
  }
  return (
    <div className="min-h-screen">
      <div className="min-h-screen">
        <h1>Incoming Queries!</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-3">
          {data.contents.map((ele: any, index: any) => {
            return (
              <div
                key={index}
                className="text-md border border-gray-300 rounded-xl py-2 px-3"
              >
                <p>
                  From: {ele.from.name} ({ele.from.email})
                </p>
                <div>
                  <p className="text-red-400">Your contact information</p>
                  <p>contact number: {ele.phonenumber}</p>
                  <p>email: {ele.email}</p>
                  <p>Text: {ele.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Query;
