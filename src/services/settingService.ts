import {ClientSetting} from "../entities/clientSetting.ts";

const clientSettingAdapter = (data: unknown): ClientSetting => {
    const setting = data as ClientSetting

    return {
        clientId: setting.clientId,
        customerInfo: {
            active: setting.customerInfo.active,
            basicInfo: setting.customerInfo.basicInfo,
            addressInfo: setting.customerInfo.addressInfo
        },
        deliveryMethods: setting.deliveryMethods.map(method => ({
            name: method.name,
            enum: method.enum,
            order: method.order,
            isDefault: method.isDefault,
            selected: method.selected
        })),
        fulfillmentFormat: {
            rfid: setting.fulfillmentFormat.rfid,
            print: setting.fulfillmentFormat.print
        },
        paymentMethods: {
            cash: setting.paymentMethods.cash,
            creditCard: setting.paymentMethods.creditCard,
            comp: setting.paymentMethods.comp
        },
        printer: {
            id: setting.printer.id
        },
        printingFormat: {
            formatA: setting.printingFormat.formatA,
            formatB: setting.printingFormat.formatB
        },
        scanning: {
            scanManually: setting.scanning.scanManually,
            scanWhenComplete: setting.scanning.scanWhenComplete
        },
        ticketDisplay: {
            leftInAllotment: setting.ticketDisplay.leftInAllotment,
            soldOut: setting.ticketDisplay.soldOut
        }
    }
}

export const getClientSettingByClientId = async (clientId: number): Promise<ClientSetting> => {
    try {
        const response = await fetch(`http://localhost:3000/client-settings/${clientId}`)
        const setting = await response.json()
        return clientSettingAdapter(setting)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateClientSetting = async (setting: ClientSetting): Promise<ClientSetting> => {
    try {
        const response = await fetch(`http://localhost:3000/client-settings/${setting.clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(setting)
        })
        const updatedSetting = await response.json()
        return clientSettingAdapter(updatedSetting)
    } catch (error) {
        console.error(error)
        throw error
    }
}