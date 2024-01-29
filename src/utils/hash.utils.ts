import bcrypt from "bcrypt";

const SALT_ROUND = 10;

interface HashResult {
  hashed: string | null;
  err: string | null;
}

export const hash = async (password: string): Promise<HashResult> => {
  let error: string | null = null;
  let hashed: string | null = null;

  try {
    hashed = await bcrypt.hash(password, SALT_ROUND);
  } catch (e) {
    if (e instanceof Error) {
      error = `Error when hash: ${e.message}`;
    }
  }

  return { hashed, err: error };
};

interface CompareHashResult {
  match: boolean;
  err: string | null;
}

export const compareHash = async (password: string, toCompare: string): Promise<CompareHashResult> => {
  let error: string | null = null;
  let match: boolean = false;

  try {
    match = await bcrypt.compare(password, toCompare);
  } catch (e) {
    if (e instanceof Error) {
      error = `Error when compare: ${e.message}`;
    }
  }

  return { match, err: error };
};

