export interface Item {
  photo: string;
  name: string;
  description: string;
  quantity: number;
  color: string;
  weight: string;
  id: number;
  size: { width: number; height: number; depth: number };
  comments: ItemComment[];
}

export interface ItemComment {
  name: string;
  text: string;
  id: number;
  date: string;
}

export interface DispatchObj {
  type: string;
  payload?: object;
}

export interface MatchProps {
  id: string;
}
