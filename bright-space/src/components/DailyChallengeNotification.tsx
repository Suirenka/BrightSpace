import {
  Avatar,
  useId,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  makeStyles,
  Text,
  ToastTrigger,
  Link,
  ToastFooter,
} from "@fluentui/react-components";
import { useEffect } from "react";
import { Edit16Regular } from "@fluentui/react-icons";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  notification: {
    fontSize: "1rem",
  },
  link: {
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export const DailyChallengeNotification = () => {
  const style = useStyles();
  const toasterId = useId("daily-chanllenge-notification-toaster");
  const { dispatchToast } = useToastController(toasterId);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatchToast(
        <Toast className={style.notification}>
          <ToastTitle media={<Avatar icon={<Edit16Regular />} size={16} />}>
            Kindness Challenge
          </ToastTitle>
          <ToastBody subtitle="">
            <Text>Do you want to try a kindness challenge? </Text>
          </ToastBody>
          <ToastFooter>
            <RouterLink to={"/bs-daily-quiz"} className={style.link}>
              <Link>Learn More</Link>
            </RouterLink>
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          </ToastFooter>
        </Toast>,
        {
          pauseOnHover: true,
          pauseOnWindowBlur: true,
          toastId: toasterId,
          timeout: 10000,
        }
      );
    }, 100);

    return () => clearTimeout(timeout);
  }, [dispatchToast, toasterId]);

  return (
    <Toaster
      toasterId={toasterId}
      position="top-end"
      offset={{ horizontal: 20, vertical: 80 }}
    />
  );
};

export default DailyChallengeNotification;
