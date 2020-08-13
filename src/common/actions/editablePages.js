// @flow
import { push } from "connected-react-router"
import {
  EDIT_PAGE,
  SAVE_PAGE_REQUEST,
  SAVE_PAGE_SUCCESS,
  SAVE_PAGE_FAILURE,
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
} from "common/constants/types"
import { printError, createErrorObj } from "common/utils/actionHelpers"
import {
  fetchBySlugResource,
  fetchByIdResource,
} from "common/utils/fetchResources"

const server = process.env.REACT_APP_API_SERVER

const fetchPageRequest = () => ({
  type: FETCH_PAGE_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchPageSuccess = (json) => ({
  type: FETCH_PAGE_SUCCESS,
  payload: {
    isFetching: false,
    json,
  },
})

const fetchPageFailure = (error) => ({
  type: FETCH_PAGE_FAILURE,
  payload: {
    error,
  },
})

const savePageRequest = () => ({
  type: SAVE_PAGE_REQUEST,
  payload: {
    isFetching: true,
  },
})

const savePageSuccess = (json) => ({
  type: SAVE_PAGE_SUCCESS,
  payload: {
    isFetching: false,
    json,
  },
})

const savePageFailure = (error) => ({
  type: SAVE_PAGE_FAILURE,
  payload: {
    error,
  },
})

// fetch page function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
const fetchPage = (slug) => async (dispatch) => {
  try {
    dispatch(fetchPageRequest())
    const res = await fetch(`${fetchBySlugResource}/${slug}`)
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(fetchPageSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }

        if (res.status !== 404) {
          dispatch(
            fetchPageFailure(createErrorObj(res.status, json.errors[0].title)),
          )
          dispatch(push("/error"))
        }

        dispatch(
          fetchPageFailure(createErrorObj(res.status, json.errors[0].title)),
        )
      }
    } else {
      dispatch(fetchPageFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(fetchPageFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

const doEdit = (content) => ({
  type: EDIT_PAGE,
  payload: {
    content,
  },
})

const editPage = (content, url) => (dispatch) => {
  dispatch(doEdit(content))
  dispatch(push(`${url}/edit`))
}

const editInline = (content) => (dispatch) => {
  dispatch(doEdit(content))
}

const saveEditing = (id, body, path) => async (dispatch, getState) => {
  try {
    dispatch(savePageRequest())
    const res = await fetch(`${fetchByIdResource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(savePageSuccess(json))
        setTimeout(() => {
          dispatch(push(`${path.slice(0, -5)}`))
        }, 1000)
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          savePageFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(savePageFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(savePageFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

const saveInlineEditing = (id, body) => async (dispatch, getState) => {
  try {
    dispatch(savePageRequest())
    const res = await fetch(`${fetchByIdResource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(savePageSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          savePageFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(savePageFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(savePageFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

const addEditablePage = (body, url) => async (dispatch, getState) => {
  try {
    dispatch(savePageRequest())
    const res = await fetch(`${server}/contents`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(savePageSuccess(json))
        setTimeout(() => {
          dispatch(push(url))
        }, 1000)
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          savePageFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(savePageFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(savePageFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

const cancelEditing = (url) => (dispatch) => {
  dispatch(push(url))
}

export {
  fetchPage,
  editPage,
  editInline,
  saveEditing,
  saveInlineEditing,
  addEditablePage,
  cancelEditing,
}