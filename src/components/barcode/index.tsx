// components/barcode.tsx
import React from 'react';
import Barcode from 'jsbarcode-react';

interface BarcodeComponentProps {
    value: string;
    width?: number;
    height?: number;
    format?: string;
}

const BarcodeComponent: React.FC<BarcodeComponentProps> = ({
    value,
    width = 2,
    height = 50,
    format = "CODE128"
}) => {
    if (!value) return null;

    return (
        <div className="flex justify-center">
            <Barcode
                value={value}
                options={{
                    format: format,
                    width: width,
                    height: height,
                    displayValue: true,
                    fontOptions: "bold",
                    font: "monospace",
                    textAlign: "center",
                    textPosition: "bottom",
                    textMargin: 2,
                    fontSize: 12,
                    background: "#ffffff",
                    lineColor: "#000000",
                    margin: 0
                }}
            />
        </div>
    );
};

export default BarcodeComponent;