import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage, FormikHelpers, FieldArray} from 'formik';
import {CircularProgress} from "@mui/material";
import Box from '@mui/material/Box';
import {updateClientSetting} from "../services/settingService.ts";
import {addSettings} from "../store/reducers/clientSettingSlice.ts";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ClientSetting} from "../entities/clientSetting.ts";


interface Props {
    open: boolean
    handleClose: () => void
}

const validationSchema = Yup.object({
    clientId: Yup.number().required('Client ID is required'),
    deliveryMethods: Yup.array().of(
        Yup.object({
            name: Yup.string().required('Delivery method name is required'),
            enum: Yup.string()
                .oneOf(['PRINT_NOW', 'PRINT_AT_HOME'])
                .required('Delivery method enum is required'),
            order: Yup.number().required('Delivery method order is required'),
            isDefault: Yup.boolean().required('Delivery method isDefault is required'),
            selected: Yup.boolean().required('Delivery method selected is required'),
        })
    ),
    fulfillmentFormat: Yup.object({
        rfid: Yup.boolean().required('RFID is required'),
        print: Yup.boolean().required('Print is required'),
    }),
    printer: Yup.object({
        id: Yup.number().nullable(),
    }),
    printingFormat: Yup.object({
        formatA: Yup.boolean().required('Format A is required'),
        formatB: Yup.boolean().required('Format B is required'),
    }),
    scanning: Yup.object({
        scanManually: Yup.boolean().required('Scan Manually is required'),
        scanWhenComplete: Yup.boolean().required('Scan When Complete is required'),
    }),
    paymentMethods: Yup.object({
        cash: Yup.boolean().required('Cash is required'),
        creditCard: Yup.boolean().required('Credit Card is required'),
        comp: Yup.boolean().required('Comp is required'),
    }),
    ticketDisplay: Yup.object({
        leftInAllotment: Yup.boolean().required('Left In Allotment is required'),
        soldOut: Yup.boolean().required('Sold Out is required'),
    }),
    customerInfo: Yup.object({
        active: Yup.boolean().required('Active is required'),
        basicInfo: Yup.boolean().required('Basic Info is required'),
        addressInfo: Yup.boolean().required('Address Info is required'),
    }),
});

export default function ClientSettingsDialog({ open, handleClose }: Props) {
    const clientSettings = useSelector((state: RootState) => state.clientSetting.setting);
    const dispatch = useDispatch<AppDispatch>();

    if (!clientSettings) {
        return (<div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <CircularProgress />
        </div>);
    }

    const handleSubmit = async (values: ClientSetting, { setSubmitting }: FormikHelpers<ClientSetting>) => {
        setSubmitting(false);

        const settingsUpdated = await updateClientSetting(values)
        dispatch(addSettings(settingsUpdated))
    };

    console.log(clientSettings);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'md'}
                fullWidth={true}
            >
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={clientSettings}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, values }) => (
                            <Form>
                                {/* Delivery Methods */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Delivery Methods
                                    </Typography>
                                    <FieldArray name="deliveryMethods">
                                        {({ remove, push }) => {
                                            const sortedDeliveryMethods = values.deliveryMethods
                                                        ? [...values.deliveryMethods].sort((a, b) => a.order - b.order)
                                                        : [];
                                            return (
                                                <div>
                                                    {sortedDeliveryMethods.map((deliveryMethod, index) => {
                                                        const isNewDeliveryMethod = index >= clientSettings.deliveryMethods.length;

                                                        return (
                                                            <Box
                                                                key={index}
                                                                mb={2}
                                                                sx={{p: 2, border: deliveryMethod.isDefault ? '' : '1px dashed grey', backgroundColor: deliveryMethod.isDefault ? 'lightgrey' : 'white'}}
                                                                display={'flex'}
                                                                justifyContent={'space-between'}>
                                                                <div key={index}>
                                                                    <div>
                                                                        <label
                                                                            htmlFor={`deliveryMethods.${index}.name`}>Name:</label>
                                                                        <Field
                                                                            type="text"
                                                                            id={`deliveryMethods.${index}.name`}
                                                                            name={`deliveryMethods.${index}.name`}
                                                                            disabled={!isNewDeliveryMethod}
                                                                        />
                                                                        <ErrorMessage name={`deliveryMethods.${index}.name`}
                                                                                      component="div"/>
                                                                    </div>

                                                                    <div>
                                                                        <label
                                                                            htmlFor={`deliveryMethods.${index}.enum`}>Type:</label>
                                                                        <Field
                                                                            as="select"
                                                                            id={`deliveryMethods.${index}.enum`}
                                                                            name={`deliveryMethods.${index}.enum`}
                                                                            disabled={!isNewDeliveryMethod}
                                                                        >
                                                                            <option value="PRINT_NOW">PRINT_NOW</option>
                                                                            <option value="PRINT_AT_HOME">PRINT_AT_HOME
                                                                            </option>
                                                                        </Field>
                                                                        <ErrorMessage name={`deliveryMethods.${index}.enum`}
                                                                                      component="div"/>
                                                                    </div>

                                                                    <div>
                                                                        <label>
                                                                            <Field type="radio"
                                                                                   name="deliveryMethods.selected"
                                                                                   value={index}
                                                                                   checked={deliveryMethod.selected}
                                                                            />
                                                                            Selected
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <HighlightOffIcon
                                                                        onClick={() => remove(index)}
                                                                        style={{ cursor: 'pointer' }}
                                                                        color={'error'}
                                                                    />
                                                                </div>
                                                            </Box>
                                                        )
                                                    })}

                                                    <Button variant="contained" onClick={() => push({
                                                        name: '',
                                                        enum: 'PRINT_NOW',
                                                        order: values.deliveryMethods.length + 1,
                                                        isDefault: false,
                                                        selected: false
                                                    })}>
                                                        Add Delivery Method
                                                    </Button>
                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </Box>

                                {/* Fulfillment Format */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Fulfillment Format
                                    </Typography>
                                    <Field type="checkbox" id="rfid" name="fulfillmentFormat.rfid"/>
                                    <label htmlFor="rfid">RFID</label>
                                    <ErrorMessage name="fulfillmentFormat.rfid" component="div"/>
                                    <br/>
                                    <Field type="checkbox" id="print" name="fulfillmentFormat.print"/>
                                    <label htmlFor="print">Print</label>
                                    <ErrorMessage name="fulfillmentFormat.print" component="div"/>
                                </Box>

                                {/* Printer */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Printer
                                    </Typography>
                                    <Field type="number" id="printerId" name="printer.id"/>
                                    <ErrorMessage name="printer.id" component="div"/>
                                </Box>

                                {/* Printing Format */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Printing Format
                                    </Typography>
                                    <Field type="checkbox" id="formatA" name="printingFormat.formatA"/>
                                    <label htmlFor="formatA">Format A</label>
                                    <ErrorMessage name="printingFormat.formatA" component="div"/>

                                    <Field type="checkbox" id="formatB" name="printingFormat.formatB"/>
                                    <label htmlFor="formatB">Format B</label>
                                    <ErrorMessage name="printingFormat.formatB" component="div"/>
                                </Box>

                                {/* Scanning */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Scanning
                                    </Typography>
                                    <Field type="checkbox" id="scanManually" name="scanning.scanManually"/>
                                    <label htmlFor="scanManually">Scan Manually</label>
                                    <ErrorMessage name="scanning.scanManually" component="div"/>

                                    <Field type="checkbox" id="scanWhenComplete" name="scanning.scanWhenComplete"/>
                                    <label htmlFor="scanWhenComplete">Scan When Complete</label>
                                    <ErrorMessage name="scanning.scanWhenComplete" component="div"/>
                                </Box>

                                {/* Payment Methods */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Payment Methods
                                    </Typography>
                                    <Field type="checkbox" id="cash" name="paymentMethods.cash"/>
                                    <label htmlFor="cash">Cash</label>
                                    <ErrorMessage name="paymentMethods.cash" component="div"/>

                                    <Field type="checkbox" id="creditCard" name="paymentMethods.creditCard"/>
                                    <label htmlFor="creditCard">Credit Card</label>
                                    <ErrorMessage name="paymentMethods.creditCard" component="div"/>

                                    <Field type="checkbox" id="comp" name="paymentMethods.comp"/>
                                    <label htmlFor="comp">Comp</label>
                                    <ErrorMessage name="paymentMethods.comp" component="div"/>
                                </Box>

                                {/* Ticket Display */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Ticket Display
                                    </Typography>
                                    <Field type="checkbox" id="leftInAllotment" name="ticketDisplay.leftInAllotment"/>
                                    <label htmlFor="leftInAllotment">Left In Allotment</label>
                                    <ErrorMessage name="ticketDisplay.leftInAllotment" component="div"/>

                                    <Field type="checkbox" id="soldOut" name="ticketDisplay.soldOut" />
                                    <label htmlFor="soldOut">Sold Out</label>
                                    <ErrorMessage name="ticketDisplay.soldOut" component="div" />
                                </Box>

                                {/* Customer Info */}
                                <Box mb={5}>
                                    <Typography variant="h5" mb={1}>
                                        Customer Info
                                    </Typography>
                                    <Field type="checkbox" id="active" name="customerInfo.active" />
                                    <label htmlFor="active">Active</label>
                                    <ErrorMessage name="customerInfo.active" component="div" />

                                    <Field type="checkbox" id="basicInfo" name="customerInfo.basicInfo" />
                                    <label htmlFor="basicInfo">Basic Info</label>
                                    <ErrorMessage name="customerInfo.basicInfo" component="div" />

                                    <Field type="checkbox" id="addressInfo" name="customerInfo.addressInfo" />
                                    <label htmlFor="addressInfo">Address Info</label>
                                    <ErrorMessage name="customerInfo.addressInfo" component="div" />
                                </Box>

                                <Button variant={'contained'} type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
}
