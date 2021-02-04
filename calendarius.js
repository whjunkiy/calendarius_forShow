import React, {useState} from 'react';

export const CalendarIt = ({value, id, name, setter, className, placeholder, required}) => {
    let mout = 0;

    const MOUT = (e) => {
        mout = 1;
    };

    const MOVER = (e) => {
        mout = 0;
    };

    const clndr = (e) => {
        const wdth = document.getElementById(id).offsetWidth;
        document.getElementById(id + '_cnldr').style.width = wdth + 'px';
        document.getElementById(id + '_cnldr').style.display = 'block';
    };

    const clndrShow = (e) => {
        const wdth = document.getElementById(id).offsetWidth;
        document.getElementById(id + '_cnldr').style.width = wdth + 'px';
        document.getElementById(id + '_cnldr').style.display = 'block';
    };

    const clndrNotShow = (e) => {
        if (mout) {
            document.getElementById(id + '_cnldr').style.display = 'none';
        }
    };

    const getMonthName = (m) => {
        switch (m) {
            case 0 : return 'Январь';
            case 1 : return 'Февраль';
            case 2 : return 'Март';
            case 3 : return 'Апрель';
            case 4 : return 'Май';
            case 5 : return 'Июнь';
            case 6 : return 'Июль';
            case 7 : return 'Август';
            case 8 : return 'Сентябрь';
            case 9 : return 'Октябрь';
            case 10 : return 'Ноябрь';
            case 11 : return 'Декабрь';
            default: return 'Месяц';
        }
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const getDayZ = (m,y) => {
        let d = [];
        m = m+1;
        for (let i = 1; i <= daysInMonth(m, y); i++ ) {
            d.push(i);
        }
        return d;
    };

    const setVal = (e,v) => {
        let ee = e;
        let m = cMonth + 1;
        setCDay(v);
        if (m < 10) m = '0' + m;
        if (v < 10) v = '0' + v;
        setSM(cMonth);
        setSY(cYear);
        ee.target.value = cYear + '-' + m + '-' + v;
        setter(ee);
        document.getElementById(id + '_cnldr').style.display = 'none';
    };

    const prevMonth = (e) => {
        let mm = parseInt(dt.month);
        let yy = parseInt(dt.year);
        if (dt.month > 0) {
            mm = mm -1;
        } else {
            mm = 11;
            yy = yy -1;
        }
        let tmp = dt;
        tmp.month = mm;
        tmp.year = yy;
        tmp.monthName = getMonthName(mm);
        tmp.dayz = getDayZ(tmp.month, tmp.year);
        setDT(tmp);
        setMName(tmp.monthName);
        setCYear(tmp.year);
        setCMonth(tmp.month);
        setCDayz(tmp.dayz);
        clndrShow();
    };

    const nextMonth = (e) => {
        let mm = parseInt(dt.month);
        let yy = parseInt(dt.year);
        if (dt.month > 10) {
            mm = 0;
            yy = yy + 1;
        } else {
            mm = mm + 1;
        }
        let tmp = dt;
        tmp.month = mm;
        tmp.year = yy;
        tmp.monthName = getMonthName(mm);
        tmp.dayz = getDayZ(tmp.month, tmp.year);
        setDT(tmp);
        setMName(tmp.monthName);
        setCYear(tmp.year);
        setCMonth(tmp.month);
        setCDayz(tmp.dayz);
        clndrShow();
    };

    const prevYear = (e) => {
        let tmp = dt;
        let yy = parseInt(dt.year);
        tmp.year = yy - 1;
        tmp.dayz = getDayZ(tmp.month, tmp.year);
        setDT(tmp);
        setCYear(tmp.year);
        setCDayz(tmp.dayz);
        clndrShow();
    };

    const nextYear = (e) => {
        let tmp = dt;
        let yy = parseInt(dt.year);
        tmp.year = yy + 1;
        tmp.dayz = getDayZ(tmp.month, tmp.year);
        setDT(tmp);
        setCYear(tmp.year);
        setCDayz(tmp.dayz);
        setTimeout(()=>clndrShow(), 100);
    };

    const data = new Date();
    const cs = {
        display: 'none',
        position: 'absolute',
        zIndex: '99999',
        border: '1px solid grey',
        borderRadius: '5px',
        backgroundColor: '#FFFFE0'
    };

    let dt_init = {
        year : data.getFullYear(),
        monthName: getMonthName(data.getMonth()),
        month: data.getMonth(),
        day: data.getDate(),
        dayz: getDayZ(data.getMonth(), data.getFullYear())
    };

    const [dt, setDT] = useState(dt_init);
    const [mName, setMName] = useState(dt_init.monthName);
    const [cYear, setCYear] = useState(dt_init.year);
    const [cMonth, setCMonth] = useState(dt_init.month);
    const [cDayz, setCDayz] = useState(dt_init.dayz);
    const [cDay, setCDay] = useState(dt_init.day);
    const [setedM, setSM] = useState(dt_init.month);
    const [setedY, setSY] = useState(dt_init.year);

    return (
        <div style={{display: 'inline-block', width: '100%'}} onBlur={clndrNotShow} onMouseOut={MOUT} onMouseOver={MOVER}>
            <input value={value} id={id} onChange={setter} name={name}
               className={className} placeholder={placeholder}
               required={required} onClick={clndr} onFocus={clndrShow}
            />
            <div id={id + '_cnldr'} style={cs} onBlur={clndrNotShow} onMouseOut={MOUT} onMouseOver={MOVER}>
                <div className="close" style={{fontSize: '20px', top: '3px', paddingBottom: '2px',opacity: '0.7',
                    color: 'black', width: '25px', right: '5px', position: 'absolute', border: '1px solid black', borderRadius: '25px'}}
                     onClick={()=>{document.getElementById(id + '_cnldr').style.display='none';}}>x</div>
                <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                    <tbody>
                    <tr>
                        <td align="center" style={{paddingTop: '5px'}}>
                            <input onClick={prevYear} type="button" value="&larr;"
                                   style={{borderRadius: '20px', padding: '0px', position: 'relative', left: '-12px', top: '-1px', lineHeight: '5px', width: '25px', height: '17px'}}/>
                            <span style={{fontWeight: 'bolder', fontSize: '13px', color: '#565741'}}>{cYear}</span>
                            <input onClick={nextYear} type="button" value="&rarr;"
                                   style={{borderRadius: '20px', padding: '0px', position: 'relative', left: '12px', top: '-1px', lineHeight: '5px', width: '25px', height: '17px'}}/>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style={{paddingTop: '5px'}} width="100%">
                            <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                                <tbody>
                                <tr>
                                    <td width="30%" align="right">
                            <button onClick={prevMonth} style={{borderRadius: '20px', padding: '0px', position: 'relative', top: '0px', lineHeight: '5px', width: '30px', height: '20px'}}>&larr;</button>
                                    </td>
                                    <td width="40%" align="center">
                                        <span style={{fontWeight: 'bold', fontSize: '15px'}}>{mName}</span>
                                    </td>
                                    <td width="30%" align="left">
                            <button onClick={nextMonth} style={{borderRadius: '20px', padding: '0px', position: 'relative', top: '0px', lineHeight: '5px', width: '30px', height: '20px'}}>&rarr;</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style={{paddingTop: '5px'}}>
                            {cDayz.map((d,i)=>{
                                return (
                                    <button style={(d===cDay && cMonth === setedM && cYear === setedY) ? {borderColor: '#0D3349', margin: '2px'} : {margin: '2px'}} key={i} onClick={(e)=>setVal(e, d)}>{d}</button>
                                )
                            })}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};