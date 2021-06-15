import React, { useState, useEffect } from 'react';
import { StatusInterface } from '../../interfaces/StatusInterface';
import actions from '../../services/StatusService';

const Status = (): JSX.Element => {
    const initialStatusState = {
        uptime: null,
        count: null,
    };
    const [status, setStatus] = useState<StatusInterface>(initialStatusState);

    const getStatus = async (): Promise<void> => {
        setStatus(await actions.getStatus());
    };

    const getTime = (): string => {
        if (status.uptime) {
            return new Date(status.uptime * 1000).toISOString().substr(11, 8);
        }
        return '';
    };

    useEffect(() => {
        getStatus();
    }, []);

    return (
        <div className="status">
            {status.uptime ? (
                <p className="uptime">
                    Uptime do servidor: {getTime()} (HH:mm:ss)
                </p>
            ) : (
                ''
            )}
            {status.count ? (
                <p className="count">
                    Contagem de pesquisas feitas no banco de dados:{' '}
                    {status.count}
                </p>
            ) : (
                ''
            )}
        </div>
    );
};

export default Status;
