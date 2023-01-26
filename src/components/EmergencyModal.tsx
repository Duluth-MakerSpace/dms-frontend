import {
    Center,
    Container, Group,
    Modal, Text,
    Title
} from '@mantine/core';
import { IconPhone, IconUser } from '@tabler/icons';
import { formatPhone } from '../utils/stringUtils';

interface EmergencyModalProps {
    p: {
        uuid: string,
        name: string,
        emergContact: string,
        emergPhone: string
    },
    opened,
    onClose
}

export default function EmergencyModal({
    p,
    opened,
    onClose,
    ...others
}: EmergencyModalProps) {

    return (

        <Modal
            centered
            size='auto'
            withCloseButton={false}
            opened={opened}
            onClose={onClose}
        >
            <Container p='lg'>
                <Center>
                    <Title size={30} color='red' mb='xs'>Emergency contact</Title>
                </Center>
                <Center>
                    <Title size={24} mb='lg'>for {p.name}</Title>
                </Center>
                <Group mb='md' spacing='xs'><IconUser color='gray' /><Text size={18} >{p.emergContact}</Text></Group>
                <Group spacing='xs'><IconPhone color='gray' /><Text size={18}>{formatPhone(p.emergPhone)}</Text></Group>
            </Container>
        </Modal>
    );
}
