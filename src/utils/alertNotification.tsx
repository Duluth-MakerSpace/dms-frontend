import { DefaultMantineColor } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle } from '@tabler/icons';


export const alertNotification = ({ title = "Error", message, color = "yellow" }) => {
    showNotification({
        autoClose: 10000,
        title: title,
        message: message,
        color: color,
        icon: <IconAlertCircle />,
    });
}