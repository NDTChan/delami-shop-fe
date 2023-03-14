import * as icons from "@tabler/icons-react";

interface Props {
  icon: string | null;
  color?: string;
  size?: string | number,
  stroke?: number;
}

export const TablerIcons = (props: Props): JSX.Element => {
  const { icon, color = "gray", size, stroke = 2 } = props;
  console.log('icon: ', icon);
  // @ts-ignore
  const Icon: JSX.Element = icons[`Icon${icon}`];

  return (
    // @ts-ignore
    <Icon size={size} />
  );
};
