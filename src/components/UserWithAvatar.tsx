import {
    Avatar, Group, Text
} from '@mantine/core';

interface UserWithAvatarProps {
    user: {
        name: string,
        avatar?: string,
    };
    nameFirst?: boolean
}

export default function UserWithAvatar({
    user,
    nameFirst = false,
    ...others
}: UserWithAvatarProps) {

    const avatar = <Avatar src={user.avatar} radius='xl' mr={4} />;
    const name = <Text weight={500} mr={4}>{user.name}</Text>

    return (
        <Group spacing={0}>
            {nameFirst
                ? <>{name}{avatar}</>
                : <>{avatar}{name}</>
            }

        </Group>
    );
}