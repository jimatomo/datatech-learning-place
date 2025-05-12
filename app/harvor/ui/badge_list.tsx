import Image from 'next/image';

interface BadgeListProps {
  correctAnswers: number;
}

export const BadgeList = ({ correctAnswers }: BadgeListProps) => {
  if (correctAnswers < 1) {
    return null;
  }

  return (
    <div className="self-start flex space-x-2">
      <Image
        src="https://datatech-learning-place.net/logo/badge_quiz_beginner.png"
        alt="Quiz Beginner Badge"
        width={100}
        height={100}
        className="rounded-lg shadow-md"
      />
      {correctAnswers >= 100 && (
        <Image
          src="https://datatech-learning-place.net/logo/badge_quiz100.png"
          alt="Quiz 100 Badge"
          width={100}
          height={100}
          className="rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default BadgeList;
