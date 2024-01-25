// react-countup.d.ts

declare module 'react-countup' {
    import React from 'react';

    interface CountUpProps {
        start?: number;
        end: number;
        duration?: number;
        separator?: string;
        decimals?: number;
        decimal?: string;
        prefix?: string;
        suffix?: string;
        formattingFn?: (value: number) => string;
        onEnd?: () => void;
        onStart?: () => void;
        onPauseResume?: () => void;
        onUpdate?: (value: number) => void;
        onStart?(): void;
        onPauseResume?(): void;
        onUpdate?(value: number): void;
        onReset?(): void;
        render?(value: number): React.ReactNode;
        formatter: any;
    }

    const CountUp: React.FC<CountUpProps>;

    export default CountUp;
}
