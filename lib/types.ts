export type ActionState = {
  errors: {
    title?: string[];
    description?: string[];
    priority?: string[];
    id?: string[];
  };
  message: string | null;
};
