import {toast} from "react-toastify";
export function handleFailedEntries(userEmail, setToast) {
    const failedEntriesString = localStorage.getItem('failedEntries');
    const failedEntries = JSON.parse(failedEntriesString);

    if (!failedEntries || failedEntries.length === 0) {
        const failedEntries = [{user: userEmail,firstTry:new Date()}];
        localStorage.setItem('failedEntries',JSON.stringify(failedEntries));
        setToast(toast.error(`Wrong email or password`));
    } else {
        const failedEntriesOfCurrentUser = failedEntries.filter(entry => entry.user === userEmail);
        if (failedEntriesOfCurrentUser.length === 0) {
            failedEntries.push({user: userEmail,firstTry:new Date()});
            localStorage.setItem('failedEntries',JSON.stringify(failedEntries));
            setToast(toast.error(`Wrong email or password`));
        }
        if (failedEntriesOfCurrentUser.length === 1) {
            failedEntries.push({user: userEmail,secondTry: new Date()});
            localStorage.setItem('failedEntries',JSON.stringify(failedEntries));
            setToast(toast.error('Last try before you got blocked!'));
        } else if (failedEntriesOfCurrentUser.length === 2){
            failedEntries.push({user: userEmail,thirdTry: new Date(),isBlocked: true});
            localStorage.setItem('failedEntries',JSON.stringify(failedEntries));
            setToast(toast.error('Your user is blocked for the next 24 hours'));
        } else if (failedEntriesOfCurrentUser.length === 3) {
            const lastDateInUtcPlusADay = getTimeForRemoveBlock(failedEntriesOfCurrentUser[2].thirdTry);
            const currentUtcTime = new Date();
            if (currentUtcTime >= lastDateInUtcPlusADay) {
                const updatedEntries = failedEntries.filter(entry => entry.user !== userEmail);
                updatedEntries.push({user: userEmail,thirdTry: new Date()});
                localStorage.setItem('failedEntries',JSON.stringify(updatedEntries));
            } else {
                printError(lastDateInUtcPlusADay,setToast);
            }
        }
    }
}
export function checkIfIsBlockedUser(userEmail,setToast) {
    let isBlocked = false;
    const failedEntries = JSON.parse(localStorage.getItem('failedEntries'));
    if (failedEntries) {
        const blockedUsers = failedEntries.filter(entry => entry.isBlocked);
        blockedUsers.forEach((blockedUser) => {
            if (blockedUser.user === userEmail) {
                const lastDateInUtcPlusADay = getTimeForRemoveBlock(blockedUser.thirdTry);
                const currentUtcTime = new Date();
                if (currentUtcTime < lastDateInUtcPlusADay) {
                    printError(lastDateInUtcPlusADay,setToast);
                    isBlocked = true;
                }
            }
        });
        return isBlocked;
    }
}
function getTimeForRemoveBlock(lastEntryDate) {
    const lastDateInUtcString = lastEntryDate.toString();
    const lastDateInUtc = new Date(lastDateInUtcString);
    lastDateInUtc.setDate(lastDateInUtc.getDate() + 1);
    return lastDateInUtc;
}
function printError(date,setToast) {
    const errorText = date.toLocaleString('he-IL');
    setToast(toast.error('24 hours have not passed yet, wait till ' + errorText));
}