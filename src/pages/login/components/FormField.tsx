import * as S from '@login/components/fomField.style';

type Props = {
  label: string;
  name: string;
  type?: 'text' | 'password';
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
};
export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: Props) {
  return (
    <S.Wrap>
      <S.Label htmlFor={name}>{label}</S.Label>
      <S.Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
      />
    </S.Wrap>
  );
}
