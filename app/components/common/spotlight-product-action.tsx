import { Badge, createStyles, Center, Group, Image, Text, UnstyledButton } from "@mantine/core";
import { SpotlightActionProps } from "@mantine/spotlight";

const useStyles = createStyles((theme) => ({
    action: {
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: '10px 12px',
        borderRadius: theme.radius.sm,
    },

    actionHovered: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
    },
}));

export function SpotlightProductAction({
    action,
    styles,
    classNames,
    hovered,
    onTrigger,
    // ...others
}: SpotlightActionProps) {
    const { classes, cx } = useStyles(undefined, { styles, classNames, name: 'Spotlight' });

    return (
        <UnstyledButton
            className={cx(classes.action, { [classes.actionHovered]: hovered })}
            tabIndex={-1}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onTrigger}
            // {...others}
        >
            <Group noWrap>
                {action.image && (
                    <Center>
                        <Image src={action.image} alt={action.title} width={50} height={50} />
                    </Center>
                )}

                <div style={{ flex: 1 }}>
                    <Text>{action.title}</Text>

                    {action.description && (
                        <Text color="dimmed" size="xs">
                            {action.description}
                        </Text>
                    )}
                </div>

                {action.new && <Badge>new</Badge>}
            </Group>
        </UnstyledButton>
    );
}
