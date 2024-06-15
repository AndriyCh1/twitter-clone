import { FeedType } from "../consts";

interface IProps {
  current: FeedType;
  onChange: (value: FeedType) => void;
}

export const SwitchFeedType = ({ current, onChange }: IProps) => {
  return (
    <div className="flex w-full border-b border-gray-700">
      <div
        className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
        onClick={() => onChange(FeedType.FOR_YOU)}
      >
        For you
        {current === FeedType.FOR_YOU && (
          <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
        )}
      </div>
      <div
        className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
        onClick={() => onChange(FeedType.FOLLOWING)}
      >
        Following
        {current === FeedType.FOLLOWING && (
          <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
        )}
      </div>
    </div>
  );
};
