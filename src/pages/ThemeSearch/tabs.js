
import { Drawer, Tabs, Radio, Checkbox, List } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const sidebar = (
    <div style={{ width: "100%", height: "100%" }}>
        <div className="drawer-top">
            <span className="drawer-top-operation" onClick={this.onOpenChange.bind(this)}>返回</span>
            <span className="drawer-top-title">筛选</span>
            <span className="drawer-top-operation" onClick={this.handleFilter.bind(this)}>确定</span>
        </div>
        <Tabs tabs={tabs}
            page={this.state.page}
            style={{ height: '100%', backgroundColor: '#fff' }}
        >
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
                <List>
                    {
                        tabs.map((item, i) => {
                            if (i === 0) return
                            return (
                                <List.Item key={i} onClick={this.handlePage.bind(this, i)}>{item.title}</List.Item>
                            )
                        })
                    }
                </List>
            </div>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
                <List>
                    {this.props.themeFields.map(i => (
                        <RadioItem key={i.id} checked={this.state.themeFieldId === i.id} onClick={() => this.onFieldChange(i.id)}>
                            {i.field}
                        </RadioItem>
                    ))}
                </List>
            </div>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
                {this.state.versions.map((i, index) => (
                    <CheckboxItem key={i.value} checked={i.checked} onClick={() => this.onVersionChange(i.value, index)}>
                        {i.value}
                    </CheckboxItem>
                ))}
            </div>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
                {this.state.types.map((i, index) => (
                    <CheckboxItem key={i.value} checked={i.checked} onClick={() => this.onTypeChange(i.value, index)}>
                        {i.value}
                    </CheckboxItem>
                ))}
            </div>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
                {this.state.status.map((i, index) => (
                    <CheckboxItem key={i.value} checked={i.checked} onClick={() => this.onStatusChange(i.value, index)}>
                        {i.value}
                    </CheckboxItem>
                ))}
            </div>
        </Tabs>
        {/* <Accordion className="theme-accordion" >
                <Accordion.Panel header="主题领域" className="field">
                    <List>
                        {this.props.themeFields.map(i => (
                            <RadioItem key={i.id} checked={this.state.themeFieldId === i.id} onChange={() => this.onFieldChange(i.id)}>
                                {i.field}
                            </RadioItem>
                        ))}
                    </List>
                </Accordion.Panel>
                <Accordion.Panel header="版本" className="version">
                    {versions.map(i => (
                        <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onVersionChange(i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </Accordion.Panel>
                <Accordion.Panel header="主题类型" className="type">
                    {types.map(i => (
                        <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onTypeChange(i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </Accordion.Panel>
                <Accordion.Panel header="状态" className="status">
                    {status.map(i => (
                        <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onStatusChange(i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </Accordion.Panel>
            </Accordion> */}
    </div>
);
export default sidebar