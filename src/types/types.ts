export interface dataCollected {
  name?: string;
  email: string;
  password: string;
}

export interface InputProps {
  placeholder: string;
  icon: string;
  onChangeText: (res: string) => void | undefined;
  secureTextEntry?: boolean;
  keyboardType?: any;
}

export interface ModalProps {
  isModalVisible: boolean;
  LeaveModal: () => void;
  handleChange: (info: string) => void;
  deleteNote: () => void;
  data: string;
}

export interface NotesProps {
  note: { __v: number; _id: string; data: string; userId: string };
  key: string | undefined;
  refreshComponent: () => void;
}

export interface Logged {
  jwt: string;
  _id: string;
  name: string;
}

export interface response {
  responseWords: string;
  ActivityIndicator: boolean;
}
