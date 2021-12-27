import { Calendar as RbCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/en-gb';

moment.locale("en-GB");

const localizer = momentLocalizer(moment)

const Calendar = (props: any) =>
    <RbCalendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
      views={['month']}
    />

export default Calendar;