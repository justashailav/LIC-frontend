import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const planSlice = createSlice({
  name: "plan",
  initialState: {
    loading: false,
    error: null,
    message: null,
    plans:[],
    popularPlans: [],
    singlePlan: null,
  },
  reducers:{
    createPlanStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createPlanSuccess: (state, action) => {
      state.loading = false;
      state.plans.push(action.payload);
      state.message = "Plan created successfully";
    },
    createPlanFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPlansStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPlansSuccess: (state, action) => {
      state.loading = false;
      state.plans = action.payload;
    },
    fetchPlansFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPopularPlansStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPopularPlansSuccess: (state, action) => {
      state.loading = false;
      state.popularPlans = action.payload;
    },
    fetchPopularPlansFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPlanBySlugStart: (state) => {
      state.loading = true;
      state.error = null;
      state.singlePlan = null;
    },
    fetchPlanBySlugSuccess: (state, action) => {
      state.loading = false;
      state.singlePlan = action.payload;
    },
    fetchPlanBySlugFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePlanStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePlanSuccess: (state, action) => {
      state.loading = false;
      state.plans = state.plans.map((plan) =>
        plan._id === action.payload._id ? action.payload : plan
      );
      state.message = "Plan updated successfully";
    },
    updatePlanFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePlanStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletePlanSuccess: (state, action) => {
      state.loading = false;
      state.plans = state.plans.filter(
        (plan) => plan._id !== action.payload
      );
      state.message = "Plan deleted successfully";
    },
    deletePlanFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearPlanState: (state) => {
      state.error = null;
      state.message = null;
    },

  }
});
export const createPlan = (data) => async (dispatch) => {
  try {
    dispatch(planSlice.actions.createPlanStart());

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/plan-categories`,
      data,
     
    );

    dispatch(planSlice.actions.createPlanSuccess(res.data));
  } catch (error) {
    dispatch(
      planSlice.actions.createPlanFail(
        error?.response?.data?.message || "Add Plans failed"
      )
    );
  }
};

export const getAllPlans = () => async (dispatch) => {
  try {
    dispatch(planSlice.actions.fetchPlansStart());

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/plan-categories`,
      { withCredentials: true }
    );

    dispatch(planSlice.actions.fetchPlansSuccess(res.data));
  } catch (error) {
    dispatch(
      planSlice.actions.fetchPlansFail(
        error?.response?.data?.message || "Failed to fetch plans"
      )
    );
  }
};
export const getPopularPlans = () => async (dispatch) => {
  try {
    dispatch(planSlice.actions.fetchPopularPlansStart());

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/plan-categories/popular`
    );

    dispatch(planSlice.actions.fetchPopularPlansSuccess(res.data));
  } catch (error) {
    dispatch(
      planSlice.actions.fetchPopularPlansFail(
        error?.response?.data?.message || "Failed to fetch popular plans"
      )
    );
  }
};

export const getPlanBySlug = (slug) => async (dispatch) => {
  try {
    dispatch(planSlice.actions.fetchPlanBySlugStart());

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/plan-categories/${slug}`
    );

    dispatch(planSlice.actions.fetchPlanBySlugSuccess(res.data));
  } catch (error) {
    dispatch(
      planSlice.actions.fetchPlanBySlugFail(
        error?.response?.data?.message || "Failed to fetch plan"
      )
    );
  }
};

export const updatePlan = ({ id, data }) => async (dispatch) => {
  try {
    dispatch(planSlice.actions.updatePlanStart());

    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/plan-categories/${id}`,
      data,
      { withCredentials: true }
    );

    dispatch(planSlice.actions.updatePlanSuccess(res.data));
  } catch (error) {
    dispatch(
      planSlice.actions.updatePlanFail(
        error?.response?.data?.message || "Failed to update plan"
      )
    );
  }
};

export const deletePlan = (id) => async (dispatch) => {
  try {
    dispatch(planSlice.actions.deletePlanStart());

    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/plan-categories/${id}`,
      { withCredentials: true }
    );

    dispatch(planSlice.actions.deletePlanSuccess(id));
  } catch (error) {
    dispatch(
      planSlice.actions.deletePlanFail(
        error?.response?.data?.message || "Failed to delete plan"
      )
    );
  }
};
export const {
  clearPlanState,
} = planSlice.actions;

export default planSlice.reducer;