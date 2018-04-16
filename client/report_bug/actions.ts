import { createAction } from 'redux-actions';
import Services from '../common/services/services';
import {
  LOAD_REPORTBUG,
  UPDATE_REPORTBUG
} from './constants/ActionTypes';
import { ReportBug } from './model';


// My Profile action creators.
const loadReportBug = createAction<any, number>(
  LOAD_REPORTBUG,
  (id: number) => Services.getEliteProfileByID(id)  
)

const updateReportBug = createAction<ReportBug, any, ReportBug>(
  UPDATE_REPORTBUG,
  (e: any, reportBug: ReportBug) => {
    if (e.target.type && e.target.type.toLowerCase() === "select-multiple") {
      let list = e.target.selectedOptions;
      let selectedItems = [];
      for (let i = 0; i < list.length; i++) {
        selectedItems.push(list[i].value);
      }

      reportBug[e.target.name] = selectedItems;
    } else {
      reportBug[e.target.name] = e.target.value;
    }
    return reportBug;
  }
);

export {
  loadReportBug,
  updateReportBug
}
