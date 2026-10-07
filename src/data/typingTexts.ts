export type Difficulty = "easy" | "medium" | "hard";

export const EASY_TEXTS: string[] = [
  "Learning to type faster takes practice. Start slowly, focus on accuracy, and gradually increase your speed. Over time, your fingers will remember where every key is.",
  "The sun was warm and the sky was clear. Birds sang in the trees while children played happily in the park near the old wooden bridge.",
  "Every morning I like to drink a cup of tea and read a few pages of my favorite book before starting the day. It helps me feel calm and ready.",
  "A good habit is hard to build but easy to keep once it becomes part of your daily routine. Small steps lead to big changes over time.",
  "My dog loves to run across the grass and chase the ball I throw for him. He never seems to get tired, even after a long walk outside.",
  "Cooking dinner for the family is one of my favorite parts of the day. I enjoy trying new recipes and sharing a warm meal with everyone.",
  "The library near my house is quiet and comfortable. I often go there to study, read, or simply enjoy some time away from my phone.",
  "Riding a bicycle is a fun way to stay active and explore your neighborhood. You can discover new streets and parks you never knew existed.",
  "Learning a new language can be challenging at first, but it becomes easier with daily practice and a little patience every single day.",
  "On rainy days, I like to stay inside, make some hot chocolate, and watch my favorite movies while listening to the sound of the rain.",
  "Our school has a big garden where students grow vegetables and flowers. It teaches everyone how much work goes into growing fresh food.",
  "Walking in the park early in the morning is a peaceful way to start the day. The air feels fresh and the streets are calm and quiet.",
  "I enjoy painting in my free time because it helps me relax and express my feelings through colors and simple shapes on the canvas.",
  "Saving a little money each week can help you reach your goals faster than you think, especially when you plan ahead and stay consistent.",
  "My grandmother taught me how to bake bread when I was young. The smell of fresh bread in the kitchen still reminds me of those days.",
  "Keeping your room clean and organized can make your whole day feel better and help you focus more easily on important tasks.",
  "The weather today is perfect for a walk outside. A gentle breeze is blowing and the temperature feels just right for an afternoon stroll.",
  "Playing music with friends is one of the best ways to relax after a busy week at school or work. It brings people together naturally.",
  "Our neighbor grows tomatoes and peppers in his backyard every summer and always shares some with us when they are ready to pick.",
  "I like to write in my journal before bed because it helps me think clearly about my day and plan for what comes next tomorrow.",
  "Visiting a new city for the first time feels exciting because there are so many new streets, foods, and people to discover there.",
  "Taking care of a small plant on your desk can brighten up your workspace and remind you to pause and breathe during a busy day.",
  "Every weekend we try to visit a different part of town so we can find new coffee shops, parks, and friendly places to relax in.",
  "Simple exercises like stretching or walking for twenty minutes a day can make a noticeable difference in how energetic you feel.",
  "A warm cup of soup on a cold evening can make even the busiest day feel a little more comfortable and relaxing.",
];

export const MEDIUM_TEXTS: string[] = [
  "Modern applications are designed to make everyday tasks easier, but building reliable software requires patience, testing, and attention to detail at every stage of development.",
  "Effective communication in the workplace often depends on clarity, active listening, and the willingness to understand different perspectives before responding to a disagreement.",
  "Over the past decade, remote work has transformed how companies operate, allowing employees to collaborate across time zones while balancing flexibility with accountability.",
  "A well-structured resume, combined with 3 to 5 years of relevant experience, can significantly increase a candidate's chances of receiving an interview invitation.",
  "The committee reviewed 42 proposals before selecting the three finalists, each of which demonstrated strong potential for long-term growth and measurable community impact.",
  "Financial planning requires balancing short-term needs with long-term goals, which means setting aside savings, tracking expenses, and occasionally adjusting your budget as circumstances change.",
  "Climate scientists have observed that average global temperatures have risen by nearly 1.1 degrees Celsius since the late 1800s, prompting renewed urgency around sustainable policy.",
  "Successful negotiation involves preparation, active listening, and the ability to identify shared interests rather than focusing solely on competing positions between both parties.",
  "The museum's new exhibit, which opened on March 14th, features over 200 artifacts collected from archaeological sites across three different continents.",
  "Customer satisfaction surveys revealed that 78 percent of respondents valued fast response times more than any other factor when evaluating a company's support team.",
  "Project managers often rely on a combination of scheduling tools, clear milestones, and regular check-ins to keep teams aligned and deadlines realistic throughout the process.",
  "Investing early, even in small amounts, can lead to significant long-term growth thanks to compound interest, provided that the money is left untouched for several years.",
  "Public speaking becomes less intimidating with practice; rehearsing in front of a mirror, recording yourself, and seeking honest feedback are all effective strategies.",
  "The restaurant's new menu, priced between $12 and $28 per entree, emphasizes locally sourced ingredients and seasonal produce from nearby farms.",
  "Urban planners must consider traffic flow, housing density, and green space when designing neighborhoods that are both livable and environmentally sustainable.",
  "A balanced diet, regular exercise, and sufficient sleep are often cited by health professionals as the three pillars of long-term physical wellbeing.",
  "The quarterly report indicated a 15 percent increase in revenue, driven largely by stronger sales in the company's three largest international markets.",
  "Negotiating a fair salary often requires researching industry standards, understanding your own value, and being prepared to discuss your expectations confidently.",
  "Many universities now offer hybrid courses that combine in-person lectures with online assignments, giving students more flexibility to manage their schedules.",
  "Time management strategies, such as prioritizing tasks and limiting distractions, can help professionals accomplish more without feeling constantly overwhelmed.",
  "The novel's plot unfolds across three decades, following a family whose fortunes rise and fall alongside the changing economic landscape of their city.",
  "Effective leaders tend to combine empathy with decisiveness, understanding when to listen patiently and when to make a difficult decision quickly.",
  "According to the survey, nearly 63 percent of participants preferred flexible working hours over a higher salary with a fixed schedule.",
  "Renewable energy sources, including solar and wind power, are expected to account for a growing share of global electricity production over the next 20 years.",
  "Good writing often depends on revision; even experienced authors rewrite their drafts multiple times before arriving at a version they consider finished.",
];

export const HARD_TEXTS: string[] = [
  "Software engineers must carefully evaluate performance, scalability, security, and maintainability before deploying a complex application to production; overlooking any of these factors can introduce critical vulnerabilities.",
  "The function signature `calculateTotal(items: Item[], tax: number): number` must handle edge cases such as empty arrays, negative values, and floating-point rounding errors gracefully.",
  "Distributed systems rely on consensus algorithms like Paxos or Raft to maintain consistency across nodes, even when network partitions or hardware failures occur unexpectedly.",
  "A well-designed REST API should use appropriate HTTP status codes (200, 201, 400, 404, 500) and adhere to idempotency principles for PUT and DELETE requests.",
  "The algorithm's time complexity, O(n log n), makes it significantly more efficient than the brute-force approach, which operates in O(n^2) for large datasets.",
  "Database normalization reduces redundancy by organizing tables into first, second, and third normal forms, though denormalization is sometimes preferred for read-heavy workloads.",
  "In object-oriented programming, encapsulation, inheritance, and polymorphism form the foundation for designing maintainable and extensible software architectures.",
  "The configuration file requires the following fields: `{ \"host\": \"localhost\", \"port\": 8080, \"timeout\": 5000 }`; omitting any of these will cause the service to fail silently.",
  "Microservices architecture introduces challenges such as network latency, eventual consistency, and the need for robust service discovery and load balancing mechanisms.",
  "Cryptographic hash functions, such as SHA-256, must exhibit properties like pre-image resistance, collision resistance, and avalanche effect to be considered secure.",
  "The compiler raised a type error on line 42: `Argument of type 'string' is not assignable to parameter of type 'number[]'`, indicating a mismatch in expected data structures.",
  "Concurrency bugs, including race conditions and deadlocks, often arise when multiple threads access shared resources without proper synchronization primitives like mutexes or semaphores.",
  "A continuous integration pipeline typically includes stages for linting, unit testing, integration testing, and deployment, often orchestrated through tools like Jenkins or GitHub Actions.",
  "Memory management in low-level languages requires developers to manually allocate and deallocate resources using functions such as malloc() and free(), unlike garbage-collected environments.",
  "The regular expression `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$` is commonly used to validate email addresses, though it does not cover every edge case defined by RFC 5322.",
  "Container orchestration platforms like Kubernetes manage deployment, scaling, and networking for containerized applications across clusters of physical or virtual machines.",
  "Binary search trees offer O(log n) average-case complexity for insertion, deletion, and lookup operations, but can degrade to O(n) if the tree becomes unbalanced.",
  "A race condition occurred because thread A read the shared variable before thread B finished writing to it, resulting in an inconsistent final state.",
  "The system architecture leverages message queues (Kafka), caching layers (Redis), and a relational database (PostgreSQL) to balance throughput, latency, and durability requirements.",
  "Static type checking, enforced through interfaces and generics, helps catch errors at compile time rather than allowing them to surface unexpectedly during runtime execution.",
  "Refactoring legacy code without adequate test coverage is risky; introducing a comprehensive suite of unit and integration tests should precede any significant structural changes.",
  "The API gateway handles authentication, rate limiting, and request routing, forwarding validated requests to the appropriate backend microservice via internal networking.",
  "Big-O notation describes the upper bound of an algorithm's growth rate, allowing engineers to compare the scalability of different solutions independent of hardware.",
  "Version control workflows, such as Git Flow or trunk-based development, define how branches, merges, and pull requests are managed across a team of contributors.",
  "A buffer overflow vulnerability occurs when a program writes more data to a fixed-length block of memory than it was allocated, potentially allowing arbitrary code execution.",
];

export const TEXTS_BY_DIFFICULTY: Record<Difficulty, string[]> = {
  easy: EASY_TEXTS,
  medium: MEDIUM_TEXTS,
  hard: HARD_TEXTS,
};

/** Average characters a fast typist might produce per minute, used to size content buffers generously. */
const CHARS_PER_MINUTE_BUFFER = 900;

function pickRandomIndex(length: number, exclude: number[]): number {
  if (length <= exclude.length) {
    return Math.floor(Math.random() * length);
  }
  let idx = Math.floor(Math.random() * length);
  while (exclude.includes(idx)) {
    idx = Math.floor(Math.random() * length);
  }
  return idx;
}

/**
 * Builds enough text for the requested duration (in seconds) by concatenating
 * random, non-repeating passages from the chosen difficulty.
 */
export function buildInitialText(
  difficulty: Difficulty,
  durationSeconds: number
): { text: string; usedIndices: number[] } {
  const pool = TEXTS_BY_DIFFICULTY[difficulty];
  const minutes = Math.max(durationSeconds / 60, 1);
  const targetLength = CHARS_PER_MINUTE_BUFFER * minutes * 1.4;

  const usedIndices: number[] = [];
  let text = "";

  while (text.length < targetLength) {
    const idx = pickRandomIndex(pool.length, usedIndices.slice(-5));
    usedIndices.push(idx);
    text += (text.length > 0 ? " " : "") + pool[idx];
  }

  return { text, usedIndices };
}

/** Appends one more random (non-immediately-repeating) passage to the existing text. */
export function extendText(
  difficulty: Difficulty,
  currentText: string,
  usedIndices: number[]
): { text: string; usedIndices: number[] } {
  const pool = TEXTS_BY_DIFFICULTY[difficulty];
  const idx = pickRandomIndex(pool.length, usedIndices.slice(-5));
  const newUsed = [...usedIndices, idx];
  return { text: `${currentText} ${pool[idx]}`, usedIndices: newUsed };
}

/** Builds an open-ended starter chunk for practice mode (no fixed duration). */
export function buildPracticeText(difficulty: Difficulty): { text: string; usedIndices: number[] } {
  return buildInitialText(difficulty, 120);
}
