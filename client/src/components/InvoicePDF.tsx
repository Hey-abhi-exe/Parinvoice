import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Invoice } from '../types';

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica' },
    header: { marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between' },
    title: { fontSize: 24, fontWeight: 'bold' },
    meta: { fontSize: 10, color: '#666' },
    billTo: { marginBottom: 20 },
    label: { fontSize: 10, color: '#666', marginBottom: 4 },
    value: { fontSize: 12, marginBottom: 10 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, marginBottom: 5 },
    tableRow: { flexDirection: 'row', paddingVertical: 5 },
    colDesc: { width: '50%' },
    colQty: { width: '15%', textAlign: 'center' },
    colPrice: { width: '15%', textAlign: 'right' },
    colTotal: { width: '20%', textAlign: 'right' },
    totalSection: { marginTop: 30, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, flexDirection: 'row', justifyContent: 'flex-end' },
    totalLabel: { fontSize: 14, fontWeight: 'bold', marginRight: 10 },
    totalValue: { fontSize: 14, fontWeight: 'bold' }
});

export const InvoicePDF = ({ invoice }: { invoice: Invoice }) => {
    let items = [];
    try {
        items = typeof invoice.items === 'string' ? JSON.parse(invoice.items) : invoice.items;
    } catch (e) { items = []; }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>INVOICE</Text>
                        <Text style={styles.meta}>#{invoice.id.slice(0, 8)}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.meta}>Date: {new Date(invoice.date).toLocaleDateString()}</Text>
                        {invoice.dueDate && <Text style={styles.meta}>Due: {new Date(invoice.dueDate).toLocaleDateString()}</Text>}
                    </View>
                </View>

                {invoice.client && (
                    <View style={styles.billTo}>
                        <Text style={styles.label}>Bill To:</Text>
                        <Text style={styles.value}>{invoice.client.name}</Text>
                        <Text style={{ fontSize: 10 }}>{invoice.client.email}</Text>
                        <Text style={{ fontSize: 10 }}>{invoice.client.address || ''}</Text>
                    </View>
                )}

                <View style={{ marginTop: 20 }}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.colDesc, { fontSize: 10, fontWeight: 'bold' }]}>DESCRIPTION</Text>
                        <Text style={[styles.colQty, { fontSize: 10, fontWeight: 'bold' }]}>QTY</Text>
                        <Text style={[styles.colPrice, { fontSize: 10, fontWeight: 'bold' }]}>PRICE</Text>
                        <Text style={[styles.colTotal, { fontSize: 10, fontWeight: 'bold' }]}>AMOUNT</Text>
                    </View>
                </View>

                {items.map((item: any, i: number) => (
                    <View key={i} style={styles.tableRow}>
                        <Text style={[styles.colDesc, { fontSize: 10 }]}>{item.description}</Text>
                        <Text style={[styles.colQty, { fontSize: 10 }]}>{item.quantity}</Text>
                        <Text style={[styles.colPrice, { fontSize: 10 }]}>${Number(item.price).toFixed(2)}</Text>
                        <Text style={[styles.colTotal, { fontSize: 10 }]}>${(item.quantity * item.price).toFixed(2)}</Text>
                    </View>
                ))}

                <View style={{ marginTop: 30, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                        <Text style={{ fontSize: 10, marginRight: 20 }}>Subtotal:</Text>
                        <Text style={{ fontSize: 10, width: 60, textAlign: 'right' }}>${(invoice.subtotal || 0).toFixed(2)}</Text>
                    </View>

                    {invoice.taxRate ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                            <Text style={{ fontSize: 10, marginRight: 20 }}>Tax ({invoice.taxRate}%):</Text>
                            <Text style={{ fontSize: 10, width: 60, textAlign: 'right' }}>${(invoice.taxAmount || 0).toFixed(2)}</Text>
                        </View>
                    ) : null}

                    {invoice.discount ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                            <Text style={{ fontSize: 10, marginRight: 20 }}>Discount:</Text>
                            <Text style={{ fontSize: 10, width: 60, textAlign: 'right' }}>-${(invoice.discount || 0).toFixed(2)}</Text>
                        </View>
                    ) : null}

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 5 }}>
                        <Text style={styles.totalLabel}>TOTAL:</Text>
                        <Text style={styles.totalValue}>${Number(invoice.total).toFixed(2)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
