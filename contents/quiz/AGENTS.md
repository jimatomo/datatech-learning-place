# Quiz Content Authoring Guide

## Scope
- Applies to every file under `contents/quiz/**`.
- Use these rules when creating or updating daily quiz files.

## File Layout
- Location: `/workspace/contents/quiz/YYYY/MM/DD.tsx`.
- Filename: the day segment of the date (for example `04.tsx`).
- Directory example:
  ```
  contents/quiz/
    2025/
      01/
      02/
      ...
    quiz.tsx (base class)
  ```

## Imports
- Required:
  ```tsx
  import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
  ```
- Optional (only import when needed):
  ```tsx
  // Table rendering
  import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
  // Code block rendering
  import { CodeBlock } from "@/components/ui/code-block";
  ```

## Starter Template
```tsx
import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: [/* three technical tags + weekday tag */],
    created_at: new Date("YYYY-MM-DD"),
    updated_at: new Date("YYYY-MM-DD"),

    // ----- quiz -----
    title: "Quiz title",
    question_jsx: <QuizQuestion />,\n    options: {
      0: "Option 1",
      1: "Option 2",
      2: "Option 3",
      3: "Option 4",
      // add more if required
    },
    answers: [/* array of correct option indexes, e.g. [0, 2] */],
    explanation_jsx: <QuizExplanation />,\n    references: [
      { title: "Reference title", url: "https://example.com" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>Write the question here.</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Write the explanation here.</p>
    </div>
  );
}
```

## Tag Policy
- Use exactly three data-technology tags plus the weekday tag (weekday tag comes last).
- Weekday tags:
  - Monday: `Snowflake Basic`
  - Tuesday: `Snowflake Advanced`
  - Wednesday: `Data Modeling`
  - Thursday: `Infrastructure`
  - Friday: `Data Application`
  - Saturday: `Data Management`
  - Sunday: `Datatech News`
- Always draw tags from `app/quiz/lib/tags.ts` (`tags` array).
- Only add new tags when no existing option fits; add them in the most appropriate category comment within `tags.ts`.
- Match official casing precisely (for example `GitHub`, `Snowflake`, `dbt`).
- Use half-width spaces for multi-word tags (`Data Modeling`).
- Do not create synonyms or spelling variations; never use `#`, emoji, or symbols in tags.
- Do not mix Japanese and English duplicates; stick to the existing language.
- When a new tag is required, include the `tags.ts` update in the same change set.
- During review confirm the weekday tag matches the file date and that all tags exist in `tags.ts`.

## Metadata Rules
- `id`: always `generateQuizId(import.meta.url)` (produces IDs like `Q20250101`).
- `file_path`: always `generateFilePath(import.meta.url)`.
- `author`: keep `"jimatomo"` unless a different owner is agreed.
- `author_url`: keep `"https://github.com/jimatomo"`.
- `created_at` and `updated_at` should match on first publish; only change `updated_at` on edits.

## Quiz Authoring Guidelines
- Prefer multi-choice formats that minimise the number of selections. With four options, ask for the single incorrect choice; with five options, choose the smaller set between correct and incorrect answers.
- Question JSX must be concise and explicit. When multiple answers are expected, state "Select all that apply".
- Use `<strong className="text-green-600">correct statements</strong>` when asking for correct answers, and `<strong className="text-red-600">incorrect statements</strong>` (or the literal string "誤っているもの") when asking for wrong answers.
- Options:
  - Keys are zero-based integers.
  - Keep tone and length consistent across options.
  - If the user must pick incorrect items, wrap the option string in a `<span className="text-red-500">...</span>` or otherwise colour it red.
- `answers` must be an array of the correct option indexes.

## Styling Notes
- Both `QuizQuestion` and `QuizExplanation` are function components.
- Use Tailwind utility classes for styling.
- `QuizExplanation` must include `className="text-xs md:text-sm"`.

## Code Block Usage
```tsx
const code = `SELECT name
FROM sample_table
QUALIFY ROW_NUMBER() OVER (PARTITION BY class ORDER BY score DESC) = 1;`;

function SQLCodeBlock() {
  return <CodeBlock code={code} showLineNumbers={false} />;
}

function QuizQuestion() {
  return (
    <div>
      <p>Select the correct result of the following SQL:</p>
      <SQLCodeBlock />
    </div>
  );
}
```

## Table Usage
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="text-center">ID</TableHead>
      <TableHead className="text-center">NAME</TableHead>
      <TableHead className="text-center">SCORE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>Alice</TableCell>
      <TableCell>95</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>2</TableCell>
      <TableCell>Bob</TableCell>
      <TableCell>85</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Explanation Writing Guidelines
- Detail why each correct statement is right and touch on why the distractors are wrong.
- Avoid phrasing like "Option 1 is correct" because the UI does not show option numbers.
- For explanations use:
  - `<p className="font-semibold text-emerald-500">Correct statement:</p>`
  - `<p className="font-semibold text-red-500">Incorrect statement (answer):</p>`
- Suggested layout:
```tsx
function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Explanation:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Detail for the correct answer.</li>
        <li>Secondary detail supporting the answer.</li>
      </ul>
      <p>Why other choices are wrong:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Reason distractor A fails.</li>
        <li>Reason distractor B fails.</li>
      </ul>
    </div>
  );
}
```

## References
- Prefer official Snowflake documentation or other reputable sources.
- Confirm every URL is real and reachable before publishing.
- Example:
  ```tsx
  references: [
    { title: "Snowflake - Warehouse overview", url: "https://docs.snowflake.com/en/user-guide/warehouses-overview" },
    { title: "Key concepts and architecture", url: "https://docs.snowflake.com/en/user-guide/intro-key-concepts" }
  ],
  ```

## Quality Checklist
- [ ] Technical accuracy is verified.
- [ ] Questions and options read clearly.
- [ ] Difficulty is appropriate for the audience.
- [ ] References cite trustworthy material.
- [ ] All reference URLs are valid.
- [ ] Weekday tag matches the quiz date.
- [ ] `created_at` and `updated_at` are set correctly.
- [ ] Required imports are present; optional imports only when used.
- [ ] Tailwind classes match the guidelines.
- [ ] Check Linter Error (Do not use ', use &apos)

## Update Policy
- When editing existing quizzes, bump only `updated_at`.
- Keep `created_at` set to the original publication date.

## Authoring Workflow
1. Create the file at `/workspace/contents/quiz/YYYY/MM/DD.tsx`.
2. Paste the starter template and fill in metadata.
3. Select the weekday tag plus three technical tags from `app/quiz/lib/tags.ts`.
4. Write the question, options, answers, and explanation.
5. Add tables or code blocks if they help clarify the prompt.
6. Add credible references.
7. Run through the quality checklist before submitting.
