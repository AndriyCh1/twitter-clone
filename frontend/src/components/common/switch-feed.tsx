import { uppercaseFirstLetter } from "../../utils/uppercase-first-letter";

export interface IProps {
  current: string;
  onChange: (value: string) => void;
  types: readonly string[];
}

export const SwitchFeed = ({ current, onChange, types }: IProps) => {
  return (
    <div className="flex w-full border-b border-gray-700">
      {types.map((type, idx) => (
        <div
          key={idx}
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => onChange(type)}
        >
          {uppercaseFirstLetter(type)}
          {current === type && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
          )}
        </div>
      ))}
    </div>
  );
};
