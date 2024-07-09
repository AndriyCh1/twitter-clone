import { Helmet } from "../../components/ui";

export const NotFoundPage = () => {
  return (
    <Helmet title="Page Not Found">
      <div className="flex-grow-[1] border-l border-r border-gray-700 min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center h-full">
          <h1 className="text-lg sm:text-3xl font-bold text-center">
            <span className="text-5xl sm:text-9xl block pb-10">404</span>
            <span>Not Found</span>
          </h1>
        </div>
      </div>
    </Helmet>
  );
};
